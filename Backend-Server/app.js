const express = require("express");
const router = require("./Routes/appRoutes");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const multer = require("multer");

const app = express();
app.use(
  // Set up CORS to allow requests from specific origins
  cors({
    origin: function (origin, callback) {
      // const allowedOrigins = "http://localhost:5173";
      const allowedOrigins = "https://vite-node.vercel.app";
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);
// app.use(
//   cors({
//     origin: ["http://localhost:5173", "https://vite-node-1.onrender.com"],
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   })
// );
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const { PORT, MONGODB_URI } = process.env;

const uploadImg = multer({ storage: multer.memoryStorage() });

mongoose
  .connect(MONGODB_URI)
  .then((res) => {
    console.log("Database Connected Successfully");
  })
  .catch((error) => {
    console.log("Error Occurred while connecting to database..", error);
  });

app.use("/", router);
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
