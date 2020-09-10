const express = require("express");
const wfoRequestController = require("../controllers/wfo-request");
const authController = require("../controllers/auth");

const router = express.Router();

router
  .route("/")
  .all(authController.authenticate())
  .get(wfoRequestController.list)
  .post(wfoRequestController.create);

router
  .route("/:id")
  .all(authController.authenticate())
  .get(wfoRequestController.get)
  .put(wfoRequestController.update)
  .delete(wfoRequestController.delete);

router
  .route("/approve/:id")
  .all(authController.authenticate())
  .put(wfoRequestController.approve);

router
  .route("/employee/:id")
  .all(authController.authenticate())
  .get(wfoRequestController.getForEmployee);

router
  .route("/team/:id")
  .all(authController.authenticate())
  .get(wfoRequestController.getForTeam);

router
  .route("/availability/:teamId/:date")
  .all(authController.authenticate())
  .get(wfoRequestController.getAvailability);

module.exports = router;
