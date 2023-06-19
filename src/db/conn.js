const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/product-api", {})
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err, "Not Connected");
  });
