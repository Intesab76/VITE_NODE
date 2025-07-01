const users = require("../Models/Users");
const otp = require("./otp");

const forgotPasswordOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.json({
      error: "Please Provide an Email Address",
    });
  }
  const user = await users.findOne({ email });
  if (!user) {
    return res.json({
      error: "User Not Found. Please Signup",
    });
  }
  if (email !== user.email) {
    return res.json({
      error: "Please Provide a Valid Email Address",
    });
  }
  await otp(email);

  return res.json({
    success: "OTP Sent Successfully To Reset Your Password",
  });
};

module.exports = forgotPasswordOtp;
