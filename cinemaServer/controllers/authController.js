const { readJsonFile, writeJsonFile } = require("../helpers/FileOp");
const { comparePassword, hashPassword } = require("../helpers/authHelper");
const UserModel = require("../models/User");
const jwt = require("jsonwebtoken");
const { permissionsFilePath, usersFilePath } = require("../paths/filePaths");

const registerController = async (req, res) => {
  try {
    const { UserName, FirstName, LastName } = req.body;

    if (!UserName) {
      return res.send({ error: "User Name is Required" });
    }

    if (!req.body.Password) {
      return res.send({ error: "Password is Required" });
    }

    if (!FirstName) {
      return res.send({ error: "First Name is Required" });
    }

    if (!LastName) {
      return res.send({ error: "Last Name is Required" });
    }

    const existingUser = await UserModel.findOne({ UserName });

    if (existingUser) {
      return res.status(409).send({
        success: false,
        message: "User already exists please login",
      });
    }

    const hashedPassword = await hashPassword(req.body.Password);

    const user = await new UserModel({
      UserName,
      Password: hashedPassword,
      FirstName,
      LastName,
    }).save();

    const { Password, isAdmin, updatedAt, __v, ...userInfo } = user._doc;

    let usersData = await readJsonFile(usersFilePath);

    usersData.users.push(userInfo);

    await writeJsonFile(usersFilePath, usersData);

    let permissionsData = await readJsonFile(permissionsFilePath);

    permissionsData.usersPermissions.push({
      id: user._id.toString(),
      permissions: [
        {
          name: "View Subscriptions",
          checked: false,
        },
        {
          name: "Create Subscriptions",
          checked: false,
        },
        {
          name: "Delete Subscriptions",
          checked: false,
        },
        {
          name: "Update Subscriptions",
          checked: false,
        },
        {
          name: "View Movies",
          checked: false,
        },
        {
          name: "Create Movies",
          checked: false,
        },
        {
          name: "Delete Movies",
          checked: false,
        },
        {
          name: "Update Movies",
          checked: false,
        },
      ],
    });

    await writeJsonFile(permissionsFilePath, permissionsData);

    res.status(201).send({
      success: true,
      message: `User ${user.UserName} Register Successfully`,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { UserName, Password } = req.body;

    if (!UserName || !Password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    const user = await UserModel.findOne({ UserName });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Username is not registered",
      });
    }

    const match = await comparePassword(Password, user.Password);
    if (!match) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized",
      });
    }

    let usersData = await readJsonFile(usersFilePath);

    let userRecord = usersData.users.find(
      (entry) => entry._id === user._id.toString()
    );

    if (userRecord.SessionTimeOut !== user.SessionTimeOut) {
      userRecord.SessionTimeOut = user.SessionTimeOut;
    }

    await writeJsonFile(usersFilePath, usersData);

    const token = jwt.sign(
      {
        UserInfo: {
          _id: user.id,
          username: user.UserName,
          isAdmin: user.isAdmin,
        },
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        username: user.UserName,
        firstName: user.FirstName,
        lastName: user.LastName,
        isAdmin: user.isAdmin,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

module.exports = {
  registerController,
  loginController,
};
