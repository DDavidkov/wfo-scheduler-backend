const httpStatus = require("http-status");

const handleError = (err, res) => {
  const { statusCode, message } = err || {};
  const statusCodeResolved = statusCode || httpStatus.INTERNAL_SERVER_ERROR;

  res.status(statusCodeResolved).json({
    status: "error",
    statusCode: statusCodeResolved,
    message
  });
};

module.exports = {
  handleError
};
