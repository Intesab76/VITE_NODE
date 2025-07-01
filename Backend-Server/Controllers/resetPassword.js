const users = require("../Models/Users");
const bcrypt = require("bcrypt");

const resetPassword = async (req, res, next) => {
  const { email, password, otpPurpose } = req.body;
  const user = await users.findOne({ email });
  const checkPasswordStrength =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;
  if (!email) {
    return res.json({ error: "Please Provide an Email Address" });
  }
  if (!user) {
    return res.json({ error: "User Not Found. Please Signup" });
  }
  if (email !== user.email) {
    return res.json({ error: "Please Provide a Valid Email Address" });
  }
  if (!password) {
    return res.json({ error: "Please Provide a Password" });
  }
  if (!checkPasswordStrength.test(password)) {
    return res.json({
      error:
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number.",
    });
  }

  user.password = password;
  await user.save();
  return res.json({
    success: "Password Reset Successfully.Login with your new password",
  });
};
module.exports = resetPassword;
