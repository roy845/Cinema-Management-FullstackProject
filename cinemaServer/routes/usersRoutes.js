const express = require("express");
const {
  getAllUsersController,
  getUserController,
  updateUserController,
  deleteUserController,
  addUserController,
  getTimeoutSessionController,
  updateTimeoutSessionController,
  getPermissionsController,
} = require("../controllers/usersController");

const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");

//router object
const router = express.Router();

//routing

//GetAllUsers || METHOD GET
router.get("/getAllUsers", requireSignIn, isAdmin, getAllUsersController);

//GetUser || METHOD GET
router.get("/getUser/:userId", requireSignIn, isAdmin, getUserController);

//AddUser || METHOD POST
router.post("/addUser", requireSignIn, isAdmin, addUserController);

//UpdateUser || METHOD PUT
router.put("/updateUser/:userId", requireSignIn, isAdmin, updateUserController);

//getTimeoutSession || METHOD GET
router.get(
  "/getTimeoutSession/:userId",
  requireSignIn,
  getTimeoutSessionController
);

//getTimeoutSession || METHOD GET
router.put(
  "/updateTimeoutSession/:userId",
  requireSignIn,
  updateTimeoutSessionController
);

//deleteUser || METHOD DELETE
router.delete(
  "/deleteUser/:userId",
  requireSignIn,
  isAdmin,
  deleteUserController
);

//getPermissions || METHOD GET
router.get("/getPermissions/:userId", requireSignIn, getPermissionsController);

module.exports = router;
