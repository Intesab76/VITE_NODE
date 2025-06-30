const users = require("../Models/Users");
const bcrypt = require("bcrypt");
const { cloudinary } = require("./cloudinaryConfig");

const updateData = async (req, res, next) => {
  try {
    const { name, email, password, gender } = req.body;
    const user = await users.findById(req.user.id);
    // console.log("IMAGE ID  ::", req.file?.filename);
    const updatedData = { name, email, password, gender };
    if (!name && !email && !password && !gender && !req.file) {
      return res.json({ error: "At least update one of the fields." });
    }

    if (req.file && user.imageId) {
      await cloudinary.uploader.destroy(user.imageId); // Delete the old image from Cloudinary
    }
    if (req.file) {
      updatedData.imageUrl = req.file.path; // Assuming the image URL is stored in req.file.path
      updatedData.imageId = req.file.filename; // If you want to store the filename as well
    }

    const userUpdate = await users.findByIdAndUpdate(
      req.user.id,
      { $set: updatedData },
      { new: true }
    );
    res.json({
      success: "Updated Successfully.",
      user: {
        name: userUpdate.name,
        email: userUpdate.email,
        imageUrl: userUpdate.imageUrl,
        gender: userUpdate.gender,
      },
    });
    // console.log("Image", req.file.path);
    // console.log("Name and Gender", name, gender);
    // console.log("Data from Update Data Route : ", data);

    // const imgData = req.file;
    // const imageUrl = req // Assuming the image URL is stored in req.file.path

    // console.log("Data", req);
    // console.log("IMAGE", typeof imageUrl);

    // if (imgData) {
    //   data.image = {
    //     data: imgData.buffer,
    //     contentType: imgData.mimetype,
    //   };
    // }

    // for (const key in data) {
    //   if (data[key] === undefined || data[key] === "") {
    //     delete data[key];
    //   }
    // }
    // for (const key in imgData) {
    //   if (imgData[key] == undefined) {
    //     delete imgData[key];
    //   }
    // }
    // console.log("Length of Data Object : ", Object.keys(data).length);

    //   if (Object.keys(data).length === 0) {
    //     return res.json({ error: "Atleast Update One of the Fields." });
    //   }
    //   if (typeof data.password === "string" && data.password.trim() !== "") {
    //     const hashedPassword = await bcrypt.hash(data.password, 10);
    //     data.password = hashedPassword;
    //   } else {
    //     delete data.password;
    //   }
    //   const updateUser = await users.findByIdAndUpdate(
    //     req.user.id,
    //     { $set: data },
    //     { new: true }
    //   );
    //   return res.json({ success: "Updated Successfully." });
  } catch (error) {
    console.log("Error while Updating the Data : ", error.message);
  }
};
module.exports = updateData;
