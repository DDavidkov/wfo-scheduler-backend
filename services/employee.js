const db = require("../models");
const Employee = db.Employee;

exports.getEmployees = async () => {
  const employees = await Employee.findAll({
    attributes: { exclude: ["password"] }
  });

  return employees;
};

exports.getEmployee = async (id) => {
  if (!id) {
    return null;
  } else {
    const employee = await Employee.findByPk(id, {
      attributes: { exclude: ["password"] },
      raw: true
    });

    return employee;
  }
};

exports.createEmployee = async (employee) => {
  const newEmployee = await Employee.create(employee);

  const { password, ...retVal } = newEmployee.dataValues;

  return retVal;
};

exports.updateEmployee = async (id, employee) => {
  const updatedEmployee = await Employee.update(employee, {
    where: { id },
    returning: true,
    plain: true
  });

  delete updatedEmployee[1].password;

  return employee;
};

exports.deleteEmployee = async (id) => {
  const deletedCount = await Employee.destroy({ where: { id } });

  return deletedCount > 0;
};
