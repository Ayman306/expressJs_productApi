require("dotenv").config();
const express = require("express");
const app = express();
require("./db/conn");
const productRouter = require("./router/product");
const userRouter = require("./router/user");
const { login, register } = require("./middleware/authMiddleWare");
const port = process.env.PORT || 3000;
app.use(express.json());
app.use("/", login);
app.use("/", register);
app.use("/products", productRouter);
app.use("/user", userRouter);
app.get("/", (req, res) => {
  res.send("Home");
});
app.get("*", (req, res) => {
  res.status(404).send("Not Found");
});
app.listen(port, () => {
  console.log(`Connection is set at ${port}`);
});
