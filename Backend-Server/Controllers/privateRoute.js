const jwt = require("jsonwebtoken");
const users = require("../Models/Users");

require("dotenv").config();

const privateRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(200).json({
        error: "Unauthorised or Session Expired. Redirecting to login page.",
        code: "401",
      });
    }
    const decoded = jwt.verify(token, process.env.JSON_SECRET_KEY);

    const user = await users.findById(decoded.id);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = privateRoute;
