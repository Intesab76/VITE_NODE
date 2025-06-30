require("dotenv").config();
const nodeMailer = require("nodemailer");

const { EMAIL_ADDRESS, PASSWORD } = process.env;

const transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_ADDRESS,
    pass: PASSWORD,
  },
});

const sendOtp = async (email, otp) => {
  const mailOptions = {
    from: EMAIL_ADDRESS,
    to: email,
    subject: `Your OTP code is `,
    text: `OTP received is ${otp}`,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    // console.log("OTP sent via email successfully. Check your inbox", info);
  } catch (error) {
    console.log(
      `Error occurred while sending OTP to the email ${email} ${error}`
    );
  }
};

module.exports = sendOtp;
