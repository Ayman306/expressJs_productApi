const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const verifyJWT = require("../middleware/verifyJWT");
const { adminAccess } = require("../middleware/accessMiddleWare");
router
  .route("/")
  .post(verifyJWT, userController.addUser)
  .get(verifyJWT, adminAccess, userController.allUser);

router
  .route("/:id")
  .get(verifyJWT, adminAccess, userController.getUser)
  .patch(verifyJWT, userController.updateUser)
  .delete(verifyJWT, adminAccess, userController.deleteUser);

module.exports = router;
