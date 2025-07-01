const generateOtp = require("./generateOtp");
const sendOtp = require("./otpSender");
const otpModel = require("../Models/OtpModels");
const users = require("../Models/Users");

const otp = async (email) => {
  try {
    console.log("OTP Function Called with Email:", email);
    const user = await users.findOne({ email });
    const otp = generateOtp();
    const otpModal = await otpModel.findOne({ email });
    if (otpModal) {
      return { error: "OTP already exists for this email." };
    }
    const otpCrt = await otpModel.create({ email, userId: user._id, otp });

    console.log("OTP AND EMAIL SENT TO NODEMAILER:: ", otp, email);
    const otpSent = await sendOtp(email, otp);

    return;
  } catch (error) {
    console.error("Error creating user:", error.message);
    if (error.name === "ValidationError") {
      console.error("Validation errors:", error.errors);
    } else if (error.code === 11000) {
      console.error("Duplicate key error:", error.keyValue);
    }
    return {
      error:
        "An error occurred while processing your request. Please try again later.",
    };
  }
};

module.exports = otp;
