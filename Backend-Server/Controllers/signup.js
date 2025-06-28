const users = require("../Models/Users");

const signup = async (req, res) => {
  const { name, email, password, gender } = req.body;
  console.log("IMAGE IN REQ BODY :", req.body.image);
  const user = await users.findOne({ email });
  console.log("Image :: ", req.file);
  if (user) {
    return res.json({
      error: "Email Already Exists. Please Login",
    });
  }

  if (!name || !email || !password || !gender) {
    return res.json({
      error: "All fields are Mandatory",
    });
  }
  const pushDataInDB = await users.create({
    name,
    email,
    password,
    gender,
    image: req.file
      ? {
          data: req.file.buffer,
          contentType: req.file.mimetype,
        }
      : undefined,
  });
  console.log("pushed data signup :: ", pushDataInDB);
  return res.json({ success: "Registered Successfully." });
};

module.exports = signup;
