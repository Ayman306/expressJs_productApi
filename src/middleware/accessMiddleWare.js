const allRoles = require("../models/roles");
const adminAccess = (req, res, next) => {
  try {
    const role = req.user.role;
    if (role !== allRoles.role[0])
      return res.status(401).json({ message: "Unauthorized" });
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized", error });
  }
};
module.exports = {
  adminAccess,
};
