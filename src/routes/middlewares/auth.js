const { jwtSecret } = require("../../config");
const jwt = require("jsonwebtoken");
const { ApiError } = require("../../utils/errors");

module.exports.authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;
  jwt.verify(token, jwtSecret, (err, info) => {
    try {
      if (err) {
        return next(new ApiError("Please login to access this resource", 401));
      } else {
        if (!info.isEmailVerified) {
          return next(new ApiError("Account is not yet verified", 401));
        }
        req.user = {
          id: info.id,
          role: info.role,
        };
        next();
      }
    } catch (err) {
      return next(new ApiError("Invalid token", 401));
    }
  });
};
module.exports.validateRole = (roles) => {
  return function (req, res, next) {
    const userRole = req.user.role;
    if (!roles.includes(userRole)) {
      return next(new ApiError("You can't access this route", 401));
    }
    next();
  };
};
