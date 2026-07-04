const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    /* ---------------- OTP SYSTEM ---------------- */
    otpHash: {
      type: String,
    },

    otpExpiresAt: {
      type: Date,
    },

    otpPurpose: {
      type: String, // REGISTER, LOGIN, FORGOT_PASSWORD
    },

    otpAttempts: {
      type: Number,
      default: 0,
    },

    lastOtpSentAt: {
      type: Date,
    },

    /* ---------------- SECURITY ---------------- */
    failedLoginAttempts: {
      type: Number,
      default: 0,
    },

    lockUntil: {
      type: Date,
    },

    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true, // createdAt + updatedAt auto
  }
);

module.exports = mongoose.model("User", userSchema);