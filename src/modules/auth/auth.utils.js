
const bcrypt = require("bcrypt");

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const hashOTP = async (otp) => {
  return bcrypt.hash(otp, 10);
};

module.exports = {
  generateOTP,
  hashOTP,
};
