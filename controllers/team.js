const httpStatus = require("http-status");
const { ErrorHandler } = require("../utils/error-handler");
const teamService = require("../services/team");

exports.list = async (_, res, next) => {
  try {
    const teams = await teamService.getTeams();
    res.status(httpStatus.OK).json(teams);
  } catch (error) {
    next(error);
  }
};

exports.get = async (req, res, next) => {
  try {
    const team = await teamService.getTeam(req.params.id);
    if (team) {
      res.status(httpStatus.OK).json(team);
    } else {
      throw new ErrorHandler(
        404,
        `There is no team with such id: ${req.params.id}`
      );
    }
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const team = await teamService.createTeam(req.body);
    res.status(httpStatus.OK).json(team);
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const team = await teamService.updateTeam(req.params.id, req.body);
    res.status(httpStatus.OK).json(team);
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const success = await teamService.deleteTeam(req.params.id);
    if (success) {
      res.sendStatus(httpStatus.OK);
    } else {
      throw ErrorHandler(
        httpStatus.NOT_FOUND,
        `Couldn't find this team: ${req.params.id}`
      );
    }
  } catch (error) {
    next(error);
  }
};

exports.getMembers = async (req, res, next) => {
  try {
    const members = await teamService.getMembers(req.params.id);
    res.status(httpStatus.OK).json(members);
  } catch (error) {
    next(error);
  }
};
