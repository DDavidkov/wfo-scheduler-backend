const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../models");
const Employee = db.Employee;

const EXPIRES = "8h";

exports.login = async (email, password) => {
  const employee = await Employee.findOne({ where: { email } });

  if (employee) {
    if (await bcrypt.compare(password, employee.password)) {
      const payload = {
        id: employee.id,
        crated_at: new Date()
      };
      const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: EXPIRES
      });

      return {
        token: "Bearer " + jwtToken,
        expires: EXPIRES,
        id: employee.id,
        role: employee.role
      };
    } else {
      return null;
    }
  } else {
    return null;
  }
};
