const generateOtp = (req, res, next) => {
  return (Math.floor(Math.random() * 900000) + 100000).toString();
};

module.exports = generateOtp;
