const User = require("./auth.model");

const findByEmail = async (email) => {
  return User.findOne({ email });
};

const findByPhone = async (phone) => {
  return User.findOne({ phone });
};

const createUser = async (userData) => {
  return User.create(userData);
};

const saveUser = async (user) => {
  return user.save();
};

const updateUser = async (user) => {
  return user.save();
};

const updateOtp = async (userId, otpHash, otpExpiresAt) => {
  return User.findByIdAndUpdate(
    userId,
    {
      otpHash,
      otpExpiresAt,
    },
    { new: true }
  );
};

module.exports = {
  findByEmail,
  findByPhone,
  createUser,
  saveUser,
  updateUser,
  updateOtp,
};