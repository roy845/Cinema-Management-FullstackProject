const express = require("express");
const {
  getAllSubscriptionsController,
} = require("../controllers/subscriptionsController");

const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");

//router object
const router = express.Router();

//routing

//getAllSubscriptions || METHOD GET
router.get(
  "/getAllSubscriptions",
  requireSignIn,
  getAllSubscriptionsController
);

module.exports = router;
