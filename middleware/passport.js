const passport = require("passport");
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;

const EmployeeService = require("../services/employee");
const { ErrorHandler } = require("./handle-error");

const params = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

const strategy = new Strategy(params, async (payload, done) => {
  const employee = await EmployeeService.getEmployee(payload.id);

  return employee
    ? done(null, { id: employee.id, role: employee.role })
    : done(new ErrorHandler(404, "Employee not found"));
});

passport.use(strategy);

module.exports = () => passport.initialize();
