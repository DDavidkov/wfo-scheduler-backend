const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../models");
const Employee = db.Employee;

const EXPIRES = "8h";

exports.login = async (email, password) => {
  const employees = await Employee.findAll({ where: { email } });
  const employee = employees[0];

  if (employee) {
    if (await bcrypt.compare(password, employee.password)) {
      const payload = { id: employee.id, crated_at: new Date() };
      const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: EXPIRES
      });

      return { token: "Bearer " + jwtToken, expires: EXPIRES };
    } else {
      return null;
    }
  } else {
    return null;
  }
};
