require("dotenv").config();
const express = require("express");
const router = express.Router();
const otp = require("../Controllers/otp.js");
const signup = require("../Controllers/signup.js");
const login = require("../Controllers/login.js");
const verifyOtp = require("../Controllers/verifyOtp.js");
const getPrivateRoute = require("../Controllers/getPrivateRoute.js");
const privateRoute = require("../Controllers/privateRoute.js");
const updateData = require("../Controllers/updateData.js");
const logout = require("../Controllers/logout.js");
const multer = require("multer");
// const cloudinaryUpload = require("../Controllers/uploadCloudinary.js");
const { storage } = require("../Controllers/cloudinaryConfig.js");

// const multerUploadImg = multer({
//   storage: multer.memoryStorage(), // Use memory storage for multer
//   limits: { fileSize: 15 * 1024 * 1024 },
// });

const multerUploadImg = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  }),
});

// Below --> for cloudinary upload... To update Image after Login.(Exclusive for Image Update Only... not for Signup)
const multerUpdateImg = multer({
  storage: storage,
  limits: { fileSize: 15 * 1024 * 1024 },
});

// router.post(
//   "/upload-cloudinary",
//   multerUploadImg.single("image"),
//   cloudinaryUpload
// );

router.get("/", (req, res, next) => {
  return res.send(`<h2>Hi from GET METHOD API</h2>`);
});

router.get("/name", (req, res, next) => {
  return res.send("Hello Intesab. I am from the Server Side");
});
router.post("/signup", multerUploadImg.single("image"), signup);

router.post("/login", login);

router.post("/send-otp", otp);

router.post("/verify-otp", verifyOtp);

router.post("/logout", logout);

router.get("/private", privateRoute, getPrivateRoute);

router.put(
  "/update",
  privateRoute,
  multerUpdateImg.single("image"),
  updateData
);

module.exports = router;
