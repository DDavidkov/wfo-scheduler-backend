const httpStatus = require("http-status");
const { ErrorHandler } = require("../utils/error-handler");
const wfoRequestService = require("../services/wfo-request");

exports.list = async (_, res, next) => {
  try {
    const wfoRequests = await wfoRequestService.getWfoRequests();
    res.status(httpStatus.OK).json(wfoRequests);
  } catch (error) {
    next(error);
  }
};

exports.get = async (req, res, next) => {
  try {
    const wfoRequest = await wfoRequestService.getWfoRequest(req.params.id);
    if (wfoRequest) {
      res.status(httpStatus.OK).json(wfoRequest);
    } else {
      throw new ErrorHandler(
        404,
        `There is no request with such id: ${req.params.id}`
      );
    }
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const wfoRequest = await wfoRequestService.createWfoRequest(req.body);
    res.status(httpStatus.OK).json(wfoRequest);
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const wfoRequest = await wfoRequestService.updateWfoRequest(
      req.params.id,
      req.body
    );
    res.status(httpStatus.OK).json(wfoRequest);
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const success = await wfoRequestService.deleteWfoRequest(req.params.id);
    if (success) {
      res.sendStatus(httpStatus.OK);
    } else {
      throw ErrorHandler(
        httpStatus.NOT_FOUND,
        `Couldn't find this request: ${req.params.id}`
      );
    }
  } catch (error) {
    next(error);
  }
};

exports.approve = async (req, res, next) => {
  try {
    const request = await wfoRequestService.getWfoRequest(req.params.id);
    if (request) {
      const approvedRequest = await wfoRequestService.updateWfoRequest({
        ...request,
        approved: true
      });

      res.status(httpStatus.OK).json(approvedRequest);
    } else {
      throw new ErrorHandler(
        404,
        `There is no request with such id: ${req.params.id}`
      );
    }
  } catch (error) {
    next(error);
  }
};

exports.getForEmployee = async (req, res, next) => {
  try {
    const requests = await wfoRequestService.getForEmployee(req.params.id);

    res.status(httpStatus.OK).json(requests);
  } catch (error) {
    next(error);
  }
};
