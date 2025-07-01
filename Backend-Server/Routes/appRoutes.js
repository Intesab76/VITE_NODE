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
const { storage } = require("../Controllers/cloudinaryConfig.js");
const loginOtp = require("../Controllers/loginOtp.js");
const forgotPasswordOtp = require("../Controllers/forgotPasswordOtp.js");
const resetPassword = require("../Controllers/resetPassword.js");

// Below --> for cloudinary upload... To update Image after Login.(Exclusive for Image Update Only... not for Signup)
const multerUploadImg = multer({
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

router.post("/send-otp", loginOtp);

router.post("/verify-otp", verifyOtp);

router.get("/private", privateRoute, getPrivateRoute);

router.put(
  "/update",
  privateRoute,
  multerUploadImg.single("image"),
  updateData
);

router.post("/logout", logout);

router.post("/forgot-password", forgotPasswordOtp);
router.post("/reset-password", resetPassword);

module.exports = router;
