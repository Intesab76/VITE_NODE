const users = require("../Models/Users");
const otpModel = require("../Models/OtpModels");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyOtp = async (req, res, next) => {
  const { email, otp, otpPurpose } = req.body;

  try {
    if (!otp) {
      return res.json({ error: "Please Enter the OTP" });
    }
    // console.log("DATA TYPE OF OTP :: ", otp);
    const user = await users.findOne({ email });

    const otpInDb = await otpModel.findOne({ userId: user._id });

    if (!otpInDb) {
      return res.json({ error: "OTP not found or has expired" });
    }

    const isOtpMatched = await bcrypt.compare(otp, otpInDb.otp);

    if (!isOtpMatched) {
      return res.json({ error: "Incorrect OTP. Did not Match." });
    }

    if (otpPurpose === "ForgotPassword") {
      await otpModel.deleteOne({ userId: user._id });

      return res.json({
        success: "OTP verified successfully. Reset your password now.",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JSON_SECRET_KEY, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // required for HTTPS (Vercel + Render)
      sameSite: "None", // required for cross-site cookies
      path: "/", // must match on clear
      maxAge: 60 * 60 * 1000, // 1 hour
    });
    await otpModel.deleteOne({ userId: user._id });
    return res.json({ success: "OTP verified successfully..." });
  } catch (error) {
    console.log(error.message);
    return res.json({ error: "OTP verification failed." });
  }
};

module.exports = verifyOtp;
