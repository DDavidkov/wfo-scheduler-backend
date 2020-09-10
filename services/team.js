const db = require("../models");
const Team = db.Team;
const Employee = db.Employee;

const ALLOWED_PERCENT = 0.3;

exports.getTeams = async () => {
  const teams = await Team.findAll();

  return teams;
};

exports.getTeam = async (id) => {
  if (!id) {
    return null;
  } else {
    const team = await Team.findByPk(id, { raw: true });

    return team;
  }
};

exports.createTeam = async (team) => {
  const newTeam = await Team.create(team);

  return newTeam;
};

exports.updateTeam = async (id, team) => {
  const updatedTeam = await Team.update(team, {
    where: { id },
    returning: true,
    plain: true
  });

  return updatedTeam[1];
};

exports.deleteTeam = async (id) => {
  const deletedCount = await Team.destroy({ where: { id } });

  return deletedCount > 0;
};

exports.getMembers = async (id) => {
  const members = await Employee.findAll({ where: { team_id: id } });

  return members;
};

exports.getEmployeeTeam = async (employee) => {
  if (employee && employee.team_id) {
    const team = await Team.findByPk(employee.team_id, { raw: true });
    return team;
  } else {
    return null;
  }
};

exports.getTeamLimit = async (id) => {
  const members = await Employee.findAll({ where: { team_id: id }, raw: true });

  return Math.ceil(members.length * ALLOWED_PERCENT);
};
