const httpStatus = require("http-status");
const passport = require("passport");

const { ErrorHandler } = require("../utils/error-handler");
const { isAuthorized } = require("../utils/helper");

const AuthService = require("../services/auth");

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await AuthService.login(email, password);

    if (token) {
      res.status(httpStatus.OK).json(token);
    } else {
      throw new ErrorHandler(401, "No employee with this email and password");
    }
  } catch (error) {
    next(error);
  }
};

exports.authenticate = (requiredRole = "Employee") => (req, res, next) => {
  try {
    passport.authenticate("jwt", { session: false }, (_, payload, error) => {
      try {
        if (error) {
          throw new ErrorHandler(401, error.message);
        } else if (!isAuthorized(payload.role, requiredRole)) {
          throw new ErrorHandler(
            403,
            "This route requires a user with role: " + requiredRole
          );
        } else {
          next();
        }
      } catch (error) {
        next(error);
      }
    })(req, res, next);
  } catch (error) {
    next(error);
  }
};
