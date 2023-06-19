const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
    unique: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
