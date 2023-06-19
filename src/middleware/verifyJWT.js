const jwt = require("jsonwebtoken");
require("dotenv").config();
const { ACCESS_TOKEN_SECRET, PRIMARY, OWNER, DAYS } = process.env;

module.exports = verifyJWT = (req, res, next) => {
  try {
    if (req.headers.authorization || req.headers.authorization == "Bearer") {
      const token = req.headers.authorization.split(" ")[1];
      const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = user;
      req.token = token;
      next();
    } else {
      return res.status(400).json(
        apiResponse({
          data: [],
          status: "BAD",
          errors: [],
          message: "Invalid Token",
        })
      );
    }
  } catch (error) {
    return res.status(400).json({ message: "Invalid token" });
  }
};
