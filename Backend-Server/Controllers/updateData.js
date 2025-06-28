const users = require("../Models/Users");
const bcrypt = require("bcrypt");

const updateData = async (req, res, next) => {
  try {
    const data = { ...req.body };
    const imgData = req.file;

    console.log("Data", typeof data);
    console.log("IMAGE", typeof imgData);

    if (imgData) {
      data.image = {
        data: imgData.buffer,
        contentType: imgData.mimetype,
      };
    }

    for (const key in data) {
      if (data[key] === undefined || data[key] === "") {
        delete data[key];
      }
    }
    for (const key in imgData) {
      if (imgData[key] == undefined) {
        delete imgData[key];
      }
    }

    if (Object.keys(data).length === 0) {
      return res.json({ error: "Atleast Update One of the Fields." });
    }
    if (typeof data.password === "string" && data.password.trim() !== "") {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      data.password = hashedPassword;
    } else {
      delete data.password;
    }
    const updateUser = await users.findByIdAndUpdate(
      req.user.id,
      { $set: data },
      { new: true }
    );
    return res.json({ success: "Updated Successfully." });
  } catch (error) {
    console.log("Error while Updating the Data : ", error.message);
  }
};
module.exports = updateData;
