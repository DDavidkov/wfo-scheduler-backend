const db = require("../models");
const Employee = db.Employee;

exports.getEmployees = async () => {
  const employees = await Employee.findAll();

  return employees;
};

exports.getEmployee = async (id) => {
  const employee = await Employee.findByPk(id);

  return employee;
};

exports.createEmployee = async (employee) => {
  const newEmployee = await Employee.create(employee);

  return newEmployee;
};

exports.updateEmployee = async (id, employee) => {
  const updatedEmployee = await Employee.update(employee, {
    where: { id },
    returning: true,
    plain: true
  });

  return updatedEmployee[1];
};

exports.deleteEmployee = async (id) => {
  const deletedCount = await Employee.destroy({ where: { id } });

  return deletedCount > 0;
};
