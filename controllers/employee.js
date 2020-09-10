const httpStatus = require("http-status");
const { ErrorHandler } = require("../utils/error-handler");
const employeeService = require("../services/employee");
const teamService = require("../services/team");

exports.list = async (_, res, next) => {
  try {
    const employees = await employeeService.getEmployees();
    res.status(httpStatus.OK).json(employees);
  } catch (error) {
    next(error);
  }
};

exports.get = async (req, res, next) => {
  try {
    const employee = await employeeService.getEmployee(req.params.id);
    if (employee) {
      const team = await teamService.getTeam(employee.team_id);
      const manager = await employeeService.getEmployee(employee.manager_id);
      res.status(httpStatus.OK).json({ ...employee, team, manager });
    } else {
      throw new ErrorHandler(
        404,
        `There is no employee with such id: ${req.params.id}`
      );
    }
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const employee = await employeeService.createEmployee(req.body);
    res.status(httpStatus.OK).json(employee);
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const employee = await employeeService.updateEmployee(
      req.params.id,
      req.body
    );
    res.status(httpStatus.OK).json(employee);
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const success = await employeeService.deleteEmployee(req.params.id);
    if (success) {
      res.sendStatus(httpStatus.OK);
    } else {
      throw ErrorHandler(
        httpStatus.NOT_FOUND,
        `Couldn't find this employee: ${req.params.id}`
      );
    }
  } catch (error) {
    next(error);
  }
};

exports.getTeam = async (req, res, next) => {
  try {
    const employee = await employeeService.getEmployee(req.params.id);
    if (employee) {
      if (employee.team_id) {
        const team = await teamService.getTeam(employee.team_id);
        res.status(httpStatus.OK).json(team);
      } else {
        res.status(httpStatus.OK).json({});
      }
    } else {
      throw new ErrorHandler(
        404,
        `There is no employee with such id: ${req.params.id}`
      );
    }
  } catch (error) {
    next(error);
  }
};
