const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();

const userRouter = require("./routes/user-router");
const productRouter = require("./routes/product-router");

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// routes
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hjfrm.mongodb.net/productpulse?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(5000);
    console.log("Server started successfully👍 ", 5000);
  })
  .catch((err) => {
    console.log(err.message);
  });
