const User = require("../models/User");
const { readJsonFile, writeJsonFile } = require("../helpers/FileOp");
const { permissionsFilePath, usersFilePath } = require("../paths/filePaths");
const { hashPassword } = require("../helpers/authHelper");

const getAllUsersController = async (req, res) => {
  try {
    let users = await User.find({});
    const permissionsData = await readJsonFile(permissionsFilePath);

    const usersWithPermissions = users.map((user) => {
      const userPermissions = permissionsData.usersPermissions.find(
        (permission) => permission.id === user._id.toString()
      );
      return userPermissions
        ? { ...user._doc, permissions: userPermissions.permissions }
        : user._doc;
    });

    res.status(200).send(usersWithPermissions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUserController = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const { Password, isAdmin, updatedAt, __v, _id, ...userInfo } = user._doc;

    let permissionsData = await readJsonFile(permissionsFilePath);

    const userPermissions = permissionsData.usersPermissions.find(
      (permission) => permission.id === userId
    );

    userInfo.permissions = userPermissions ? userPermissions.permissions : [];

    res.status(200).send(userInfo);
  } catch (err) {
    res.status(500).send({ message: "Failed to fetch user" });
  }
};

const addUserController = async (req, res) => {
  try {
    const { user, permissions } = req.body;

    const { UserName, FirstName, LastName, SessionTimeOut } = user;

    //validations
    if (!user.UserName) {
      return res.send({ error: "User Name is Required" });
    }

    if (!req.body.user.Password) {
      return res.send({ error: "Password is Required" });
    }

    if (!user.FirstName) {
      return res.send({ error: "First Name is Required" });
    }

    if (!user.LastName) {
      return res.send({ error: "Last Name is Required" });
    }

    if (!user.SessionTimeOut) {
      return res.send({ error: "SessionTimeOut is Required" });
    }

    //check user
    const existingUser = await User.findOne({ UserName });

    if (existingUser) {
      return res.status(409).send({
        success: false,
        message: "User already exists please login",
      });
    }

    //regiser user
    const hashedPassword = await hashPassword(req.body.user.Password);

    //save new user to db
    const newUser = await new User({
      UserName,
      Password: hashedPassword,
      FirstName,
      LastName,
      SessionTimeOut,
    }).save();

    const { Password, isAdmin, updatedAt, __v, ...userInfo } = newUser._doc;

    //reading and writing to Users.json file
    let usersData = await readJsonFile(usersFilePath);

    usersData.users.push(userInfo);

    await writeJsonFile(usersFilePath, usersData);

    //reading and writing to Permissions.json file
    let permissionsData = await readJsonFile(permissionsFilePath);

    permissionsData.usersPermissions.push({
      id: newUser._id.toString(),
      permissions: permissions,
    });

    await writeJsonFile(permissionsFilePath, permissionsData);

    res.status(201).send({
      success: true,
      message: `User ${newUser.UserName} added Successfully`,
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

const updateUserController = async (req, res) => {
  try {
    const { updatedUser, permissions } = req.body;
    const { userId } = req.params;

    const user = await User.findById(userId);

    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        FirstName: updatedUser.FirstName || user.FirstName,
        LastName: updatedUser.LastName || user.LastName,
        UserName: updatedUser.UserName || user.UserName,
        Password:
          updatedUser.Password === ""
            ? user.Password
            : await hashPassword(updatedUser.Password),
        SessionTimeOut: updatedUser.SessionTimeOut,
      },
      { new: true }
    );

    const { Password, isAdmin, updatedAt, __v, ...userInfo } = updateUser._doc;

    //reading and writing to Users.json file
    let usersData = await readJsonFile(usersFilePath);

    const indexOfUserFromFile = usersData.users.findIndex(
      (user) => user._id === userId
    );

    usersData.users[indexOfUserFromFile] = userInfo;

    await writeJsonFile(usersFilePath, usersData);

    //reading and writing to Permissions.json file
    let permissionsData = await readJsonFile(permissionsFilePath);

    const indexOfPermissionsFromFile =
      permissionsData.usersPermissions.findIndex(
        (permission) => permission.id === userId
      );

    permissionsData.usersPermissions[indexOfPermissionsFromFile] = {
      id: userId,
      permissions: permissions,
    };

    await writeJsonFile(permissionsFilePath, permissionsData);

    res.status(200).send("User updated successfully!");
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating user",
      error,
    });
  }
};

const deleteUserController = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    await User.findByIdAndDelete(userId);

    //reading and writing to Users.json file
    let usersData = await readJsonFile(usersFilePath);

    const indexOfUserFromFile = usersData.users.findIndex(
      (user) => user._id === userId
    );

    if (indexOfUserFromFile !== -1) {
      usersData.users.splice(indexOfUserFromFile, 1);
    }

    await writeJsonFile(usersFilePath, usersData);

    //reading and writing to Permissions.json file
    let permissionsData = await readJsonFile(permissionsFilePath);

    const indexOfPermissionsFromFile =
      permissionsData.usersPermissions.findIndex(
        (permission) => permission.id === userId
      );

    if (indexOfPermissionsFromFile !== -1) {
      permissionsData.usersPermissions.splice(indexOfUserFromFile, 1);
    }

    await writeJsonFile(permissionsFilePath, permissionsData);

    res.status(200).send("User is deleted successfully.");
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in deleting user",
      error,
    });
  }
};

const getTimeoutSessionController = async (req, res) => {
  try {
    const { userId } = req.params;

    let usersData = await readJsonFile(usersFilePath);

    const indexOfUserFromFile = usersData.users.findIndex(
      (user) => user._id === userId
    );

    const timoutSession = usersData.users[indexOfUserFromFile].SessionTimeOut;

    res.status(200).send({ timeout: timoutSession * 60 });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in getting timeout",
      error,
    });
  }
};

const updateTimeoutSessionController = async (req, res) => {
  try {
    const { userId } = req.params;
    const { updatedSeconds } = req.body;

    console.log(req.body);

    let usersData = await readJsonFile(usersFilePath);

    let userRecord = usersData.users.find((user) => user._id === userId);
    userRecord.SessionTimeOut = updatedSeconds;

    await writeJsonFile(usersFilePath, usersData);
    res.status(200).send("timeout updated successfully.");
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in updating timeout",
      error,
    });
  }
};

const getPermissionsController = async (req, res) => {
  try {
    const { userId } = req.params;

    let permissionsData = await readJsonFile(permissionsFilePath);

    const permissionRecord = permissionsData.usersPermissions.find(
      (permission) => permission.id === userId
    );

    res.status(200).send(permissionRecord);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in getting permissions",
      error,
    });
  }
};

module.exports = {
  getAllUsersController,
  getUserController,
  updateUserController,
  deleteUserController,
  addUserController,
  getTimeoutSessionController,
  getPermissionsController,
  updateTimeoutSessionController,
};
