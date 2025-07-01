const users = require("../Models/Users");
const otp = require("./otp");

const loginOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.json({ error: "Please Provide an Email Address" });
  }
  const user = await users.findOne({ email });
  if (!user) {
    return res.json({ error: "User Not Found. Please Signup" });
  }

  await otp(email);

  return res.json({
    success: "OTP SENT SUCCESSFULLY TO LOGIN",
  });
};
module.exports = loginOtp;
