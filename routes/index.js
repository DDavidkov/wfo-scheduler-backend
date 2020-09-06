const express = require("express");
const router = express.Router();

const employeeRoutes = require("./employee");
const teamRoutes = require("./team");
const wfoRequestRoutes = require("./wfo-request");
const authRoutes = require("./auth");

router.use("/employee", employeeRoutes);
router.use("/team", teamRoutes);
router.use("/wfo-request", wfoRequestRoutes);
router.use("/auth", authRoutes);

module.exports = router;
