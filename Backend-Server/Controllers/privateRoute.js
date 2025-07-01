const jwt = require("jsonwebtoken");
const users = require("../Models/Users");

require("dotenv").config();

const privateRoute = async (req, res, next) => {
  try {
    const { prop } = req.query || "";
    // console.log("Prop passed to backend", prop);
    const token = req.cookies.token;
    if (!token && prop === "private") {
      return res.status(200).json({
        error: "Unauthorised User or Session Expired.",
        code: "401",
      });
    }
    if (!token && prop === "update") {
      return res.json({
        error: "Please Login First to Update the Data.",
      });
    }
    if (!token) {
      return res.json({ error: "Token Not provided" });
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
