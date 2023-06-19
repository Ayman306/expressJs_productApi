const User = require("../models/user_model");

// add users
const addUser = async (req, res) => {
  try {
    const user = new User(req.body);
    const createUser = await user.save();
    res.status(200).send(createUser);
  } catch (err) {
    res.status(400).send(err);
  }
};
// all users
const allUser = async (req, res) => {
  try {
    console.log("user role is", req.user.role);
    const user = await User.find();
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};
// particular users detail
const getUser = async (req, res) => {
  try {
    const _id = req.params.id;
    const userData = await User.findById(_id);
    res.status(200).send(userData);
  } catch (err) {
    res.status(500).send(err);
  }
};
// update a single user details by id
const updateUser = async (req, res) => {
  try {
    let updatedUserData = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res
      .status(200)
      .json({ success: `Data Updated Successfully`, data: updatedUserData });
  } catch (error) {
    console.log("Error in updating the record");
    res.status(404).send(error);
  }
};
// delete user  by id
const deleteUser = async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ Message: "User deleted", deleteUser: deleteUser });
  } catch (err) {
    res.status(404).send(err);
  }
};

module.exports = {
  addUser,
  allUser,
  getUser,
  updateUser,
  deleteUser,
};
