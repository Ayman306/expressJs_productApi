require("dotenv").config();
const express = require("express");
const app = express();
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user_model");
const bcrypt = require("bcrypt");

require("../db/conn");
app.use(express.json());
let refreshTokens = [];
const login = router.post("/login", async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.findOne({ name });
    if (!user || password !== user.password) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    refreshTokens.push(refreshToken);
    res.status(200).json({ accessToken, refreshToken });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});
const register = router.post("/register", async (req, res) => {
  try {
    const { name, password,role } = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = new User({ name, password: hashedPassword ,role});

    console.log(user);
    const createUser = await user.save();
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    refreshTokens.push(refreshToken);
    res.status(200).json({ accessToken, refreshToken, createUser });
  } catch (err) {
    res.status(400).send(err);
  }
});

function generateAccessToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "2d",
    }
  );
}

function generateRefreshToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );
}

module.exports = {
  register,
  login,
};
