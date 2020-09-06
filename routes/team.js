const express = require("express");
const teamController = require("../controllers/team");
const authController = require("../controllers/auth");

const router = express.Router();

router
  .route("/")
  .all(authController.authenticate())
  .get(teamController.list)
  .post(teamController.create);

router
  .route("/:id")
  .all(authController.authenticate())
  .get(teamController.get)
  .put(teamController.update)
  .delete(teamController.delete);

router
  .route("/get-members/:id")
  .all(authController.authenticate())
  .get(teamController.getMembers);

module.exports = router;
