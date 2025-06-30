const generateOtp = require("./generateOtp");
const sendOtp = require("./otpSender");
const otpModel = require("../Models/OtpModels");
const users = require("../Models/Users");

const otp = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      console.log("No email found");
      return res.json({ error: "Email Not Found" });
    }
    const user = await users.findOne({ email });

    if (!user) {
      return res.json({ error: "Email not found" });
    } else {
      const otp = generateOtp();
      const otpModal = await otpModel.findOne({ email });
      if (otpModal) {
        return res.json({
          error: "OTP already exists.",
        });
      }
      const otpCrt = await otpModel.create({ email, userId: user._id, otp });

      console.log("OTP AND EMAIL SENT TO NODEMAILER:: ", otp, email);
      const otpSent = await sendOtp(email, otp);
      return res.json({ success: "OTP SENT SUCCESSFULLY" });
    }
  } catch (error) {
    console.error("Error creating user:", error.message);
    if (error.name === "ValidationError") {
      console.error("Validation errors:", error.errors);
    } else if (error.code === 11000) {
      console.error("Duplicate key error:", error.keyValue);
    }
    res.json({ error: "Error while Sending OTP" });
  }
};

module.exports = otp;
