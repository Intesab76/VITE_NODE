const users = require("../Models/Users");

const loggedInUserName = async (req, res) => {
  // const { email } = req.body;

  const user = await users.findOne({ email });

  //   console.log(user);
  const name = user.map((name) => name.name);
  const filterName = name.filter((name) => name == name);
  //   console.log(name.filter((name) => name == "arpita"));
  res.json({ filterName });
  //   if (!user) {
  //     res.json({ error: "No Email Exists" });
  //   }

  //   res.json({ success: `${user.name}` });
};

module.exports = loggedInUserName;
