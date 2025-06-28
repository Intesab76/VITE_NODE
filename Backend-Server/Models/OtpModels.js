const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const OtpSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now, expires: 60 },
});

OtpSchema.pre("save", async function (req, res, next) {
  const hashedOtp = await bcrypt.hash(this.otp, 10);
  this.otp = hashedOtp;
});

const otpModel = mongoose.model("user_otp", OtpSchema);

module.exports = otpModel;
