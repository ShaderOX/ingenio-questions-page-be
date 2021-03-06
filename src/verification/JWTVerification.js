const jwt = require("jsonwebtoken");

module.exports.verifyToken = (token) => {
  return jwt.verify(token, process.env.SALT);
};
