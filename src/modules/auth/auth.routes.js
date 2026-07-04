
const express = require("express");
const router = express.Router();
console.log(" auth.routes.js loaded");

const authController = require("./auth.controller");

const validate = require("../../middleware/validate.middleware");
const {
  registerSchema,
  otpSchema,
  loginSchema,
  loginOtpSchema,
  resetPasswordSchema,
} = require("./auth.validation");

router.post("/register", authController.register);
router.post("/verify-otp", authController.verifyOtp);
router.post("/set-password", authController.setPassword);
router.post("/login-password", authController.loginPassword);
router.post("/login-otp", authController.loginOtp);
router.post("/verifyLoginOtp",authController.verifyLoginOtp);
router.post("resend-otp", authController.resendOtp);
router.post("/forgot-password", authController.forgotPassword);
router.post("/refresh-token", authController.refreshToken);
router.post("/logout", authController.logout);


module.exports = router;