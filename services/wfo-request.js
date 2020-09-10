const db = require("../models");
const e = require("express");
const WFORequest = db.WFORequest;
const Employee = db.Employee;

exports.getWfoRequests = async () => {
  const wfoRequests = await WFORequest.findAll();

  return wfoRequests;
};

exports.getWfoRequest = async (id) => {
  const wfoRequest = await WFORequest.findByPk(id);

  return wfoRequest;
};

exports.createWfoRequest = async (wfoRequest) => {
  const newWfoRequest = await WFORequest.create(wfoRequest);

  return newWfoRequest;
};

exports.updateWfoRequest = async (id, wfoRequest) => {
  const updatedWfoRequest = await WFORequest.update(wfoRequest, {
    where: { id },
    returning: true,
    plain: true
  });

  return updatedWfoRequest[1];
};

exports.deleteWfoRequest = async (id) => {
  const deletedCount = await WFORequest.destroy({ where: { id } });

  return deletedCount > 0;
};

exports.getForEmployee = async (id) => {
  const requests = await WFORequest.findAll({
    where: { employee_id: id },
    raw: true
  });
  return requests;
};

exports.getForTeam = async (teamId) => {
  const employees = await Employee.findAll({
    where: { team_id: teamId },
    raw: true
  });

  const requests = await WFORequest.findAll({
    where: {
      employee_id: { [db.Sequelize.Op.in]: employees.map((e) => e.id) }
    },
    raw: true
  });

  return requests.map((r) => {
    const employee = employees.find((e) => e.id === r.employee_id);

    return { ...r, employee: employee.first_name + " " + employee.last_name };
  });
};
