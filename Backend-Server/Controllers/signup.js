const fs = require("fs");
const path = require("path");
const users = require("../Models/Users");
const { storage, cloudinary } = require("../Controllers/cloudinaryConfig.js");

const signup = async (req, res) => {
  const { name, email, password, gender } = req.body;
  const user = await users.findOne({ email });

  const checkPasswordStrength =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;
  // At least 8 characters, one uppercase, one lowercase, one number, and one special character

  if (!name || !email || !password || !gender || !req.file) {
    return res.json({
      error: "All fields are mandatory",
    });
  }

  if (!checkPasswordStrength.test(password)) {
    return res.json({
      error:
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number.",
    });
  }
  if (user) {
    return res.json({
      error: "Email Already Exists. Please Login",
    });
  }

  // console.log("IMAGE IN REQ BODY :", req.body.image); //If Image stored in MongodbDB as Buffer

  if (req.file) {
    const imageToCloudinary = await cloudinary.uploader.upload(req.file.path, {
      folder: "Signed_up_Cloudinary_Images", // Optional: specify a folder in Cloudinary
    });
  }
  if (user) {
    // If user already exists, delete the uploaded file

    return res.json({
      error: "Email Already Exists. Please Login",
    });
  }
  const pushDataInDB = await users.create({
    name,
    email,
    password,
    gender,
    imageUrl: req.file?.path, // Assuming the image URL is stored in req.file.path
    imageId: req.file?.filename, // If you want to store the filename as well

    //If Image stored in MongodbDB as Buffer --> Below code is commented
    // image: req.file
    // ? {
    // data: req.file.buffer,
    // contentType: req.file.mimetype,
    //   }
    // : undefined,
  });
  // console.log("pushed data signup :: ", pushDataInDB);
  return res.json({ success: "Registered Successfully." });
};

module.exports = signup;
