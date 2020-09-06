const db = require("../models");
const Team = db.Team;
const Employee = db.Employee;

exports.getTeams = async () => {
  const teams = await Team.findAll();

  return teams;
};

exports.getTeam = async (id) => {
  const team = await Team.findByPk(id);

  return team;
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
