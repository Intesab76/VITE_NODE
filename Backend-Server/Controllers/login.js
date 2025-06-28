const users = require("../Models/Users");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await users.findOne({ email });

  if (!email || !password) {
    return res.json({
      error: "All fields are mandatory",
    });
  }
  if (!user) {
    return res.json({ error: "Email does not exist. Please sign up" });
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) {
    return res.json({ error: "Password did not match. Try Again" });
  }

  return res.json({
    success: "OTP SENT",
  });
};

module.exports = login;
