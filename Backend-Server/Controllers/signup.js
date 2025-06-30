const fs = require("fs");
const path = require("path");
const users = require("../Models/Users");
const { storage, cloudinary } = require("../Controllers/cloudinaryConfig.js");

const signup = async (req, res) => {
  const { name, email, password, gender } = req.body;
  const user = await users.findOne({ email });
  console.log("Image URL :: ", req.file?.path);
  console.log("IMAGE ID ::", req.file?.filename);

  const checkPasswordStrength =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;
  // At least 8 characters, one uppercase, one lowercase, one number, and one special character
  // console.log(
  //   "TEST PASSWORD STRENGTH :: ",
  //   checkPasswordStrength.test(password)
  // );

  if (!name || !email || !password || !gender || !req.file) {
    return res.json({
      error: "All fields are Mandatory",
    });
  }

  if (!checkPasswordStrength.test(password)) {
    if (req.file) {
      // If the password validation fails, delete the uploaded file
      fs.unlink(req.file?.path || "", (err) => {
        if (err) {
          console.error("Error deleting file:", err);
        }
      }); // Delete the uploaded file if password validation fails
      console.log("Password validation failed. File deleted.");
    }
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
    fs.unlink(req.file?.path || "", (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      }
    });
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
  fs.unlink(req.file?.path, (err) => {
    if (err) {
      console.error("Error deleting file:", err);
    }
  }); // Delete the uploaded file after saving to the database
  // console.log("pushed data signup :: ", pushDataInDB);
  return res.json({ success: "Registered Successfully." });
};

module.exports = signup;
