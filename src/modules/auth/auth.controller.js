const authService = require("./auth.service");

/* ---------------- REGISTER ---------------- */
const register = async (req, res) => {
  try {
    const result = await authService.register(req.body);

    res.status(201).json({
      success: true,
      message: "Registration successful",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* ---------------- VERIFY OTP ---------------- */
const verifyOtp = async (req, res) => {
  try {
    const result = await authService.verifyOtp(req.body);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* ---------------- SET PASSWORD ---------------- */
const setPassword = async (req, res) => {
  try {
    const result = await authService.setPassword(req.body);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* ---------------- LOGIN PASSWORD ---------------- */
const loginPassword = async (req, res) => {
  try {
    const result = await authService.loginPassword(req.body);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* ---------------- LOGIN OTP SEND ---------------- */
const loginOtp = async (req, res) => {
  try {
    const result = await authService.loginOtp(req.body);

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* ---------------- VERIFY LOGIN OTP ---------------- */
const verifyLoginOtp = async (req, res) => {
  try {
    const result = await authService.verifyLoginOtp(req.body);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* ---------------- RESEND OTP ---------------- */
const resendOtp = async (req, res) => {
  try {
    const result = await authService.resendOtp(req.body);

    res.status(200).json({
      success: true,
      message: "OTP resent successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* ---------------- FORGOT PASSWORD ---------------- */
const forgotPassword = async (req, res) => {
  try {
    const result = await authService.forgotPassword(req.body);

    res.status(200).json({
      success: true,
      message: "OTP sent for password reset",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* ---------------- RESET PASSWORD ---------------- */
const resetPassword = async (req, res) => {
  try {
    const result = await authService.resetPassword(req.body);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* ---------------- REFRESH TOKEN ---------------- */
const refreshToken = async (req, res) => {
  try {
    const result = await authService.refreshToken(req.body);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};



/* ---------------- LOGOUT ---------------- */
const logout = async (req, res) => {
  try {
    const result = await authService.logout(req.body);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  register,
  verifyOtp,
  setPassword,
  loginPassword,
  loginOtp,
  verifyLoginOtp,
  resendOtp,
  forgotPassword,
  resetPassword,
  refreshToken,
  logout,
};