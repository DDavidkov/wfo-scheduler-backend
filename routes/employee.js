const express = require("express");
const employeeController = require("../controllers/employee");
const authController = require("../controllers/auth");

const router = express.Router();

router
  .route("/")
  .all(authController.authenticate("Admin"))
  .get(employeeController.list)
  .post(employeeController.create);

router
  .route("/:id")
  .all(authController.authenticate("Admin"))
  .get(employeeController.get)
  .put(employeeController.update)
  .delete(employeeController.delete);

module.exports = router;
