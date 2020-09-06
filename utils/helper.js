const isAuthorized = (role, requiredRole) => {
  switch (role) {
    case "Admin":
      return true;
    case "Manager":
      return requiredRole !== "Admin";
    case "Employee":
      return requiredRole === "Employee";
    default:
      return false;
  }
};

module.exports = { isAuthorized };
