const express = require("express");

const router = express.Router();

const {
  getAllSubscriptionsController,
} = require("../controllers/subscriptionsController");

//getAllSubscriptions || METHOD GET
router.get("/getAllSubscriptions", getAllSubscriptionsController);

module.exports = router;
