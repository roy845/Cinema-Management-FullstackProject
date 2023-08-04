const express = require("express");
const authRoutes = require("./authRoutes");
const usersRoutes = require("./usersRoutes");
const moviesRoutes = require("./moviesRoutes");
const membersRoutes = require("./membersRoutes");
const subscriptionsRoutes = require("./subscriptionsRoutes");

const router = express.Router();

router.use("/api/auth", authRoutes);
router.use("/api/users", usersRoutes);
router.use("/api/movies", moviesRoutes);
router.use("/api/members", membersRoutes);
router.use("/api/subscriptions", subscriptionsRoutes);

module.exports = router;
