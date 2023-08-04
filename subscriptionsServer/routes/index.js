const express = require("express");
const moviesRoutes = require("./moviesRoutes");
const membersRoutes = require("./membersRoutes");
const subscriptionsRoutes = require("./subscriptionsRoutes");

const router = express.Router();

router.use("/api/movies", moviesRoutes);
router.use("/api/members", membersRoutes);
router.use("/api/subscriptions", subscriptionsRoutes);

module.exports = router;
