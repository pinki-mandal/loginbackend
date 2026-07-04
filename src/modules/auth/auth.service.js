const authRepository = require("./auth.repository");
const { generateOTP, hashOTP } = require("./auth.utils");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/* ---------------- REGISTER ---------------- */
const register = async ({ name, email, phone }) => {
  const existingEmail = await authRepository.findByEmail(email);
  if (existingEmail) throw new Error("Email already registered");

  const existingPhone = await authRepository.findByPhone(phone);
  if (existingPhone) throw new Error("Phone number already registered");

  const user = await authRepository.createUser({ name, email, phone });

  const otp = generateOTP();
  const otpHash = await hashOTP(otp);

  user.otpHash = otpHash;
  user.otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);
  user.otpPurpose = "REGISTER";

  await authRepository.saveUser(user);

  console.log("Registration OTP:", otp);

  return user;
};

/* ---------------- VERIFY OTP ---------------- */
const verifyOtp = async ({ email, otp }) => {
  const user = await authRepository.findByEmail(email);
  if (!user) throw new Error("User not found");

  const isValid = await bcrypt.compare(otp, user.otpHash);
  if (!isValid) throw new Error("Invalid OTP");

  user.isVerified = true;
  user.otpHash = null;
  user.otpExpiresAt = null;
  user.otpPurpose = null;

  await authRepository.saveUser(user);

  return { message: "OTP verified successfully" };
};

/* ---------------- SET PASSWORD ---------------- */
const setPassword = async ({ email, password }) => {
  const user = await authRepository.findByEmail(email);
  if (!user) throw new Error("User not found");

  const hashedPassword = await bcrypt.hash(password, 10);

  user.password = hashedPassword;
  user.isVerified = true;

  await authRepository.saveUser(user);

  return { message: "Password created successfully" };
};

/* ---------------- LOGIN PASSWORD ---------------- */
const loginPassword = async ({ email, password }) => {
  const user = await authRepository.findByEmail(email);
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid password");

  const accessToken = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken, user };
};

/* ---------------- LOGIN OTP SEND ---------------- */
const loginOtp = async ({ email }) => {
  const user = await authRepository.findByEmail(email);
  if (!user) throw new Error("User not found");

  const otp = generateOTP();
  const otpHash = await hashOTP(otp);

  user.otpHash = otpHash;
  user.otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);
  user.otpPurpose = "LOGIN";

  await authRepository.saveUser(user);

  console.log("Login OTP:", otp);

  return { email: user.email };
};

/* ---------------- VERIFY LOGIN OTP ---------------- */
const verifyLoginOtp = async ({ email, otp }) => {
  const user = await authRepository.findByEmail(email);
  if (!user) throw new Error("User not found");

  const isValid = await bcrypt.compare(otp, user.otpHash);
  if (!isValid) throw new Error("Invalid OTP");

  user.otpHash = null;
  user.otpExpiresAt = null;
  user.otpPurpose = null;

  await authRepository.saveUser(user);

  const accessToken = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken, user };
};

/* ---------------- RESEND OTP ---------------- */
const resendOtp = async ({ email }) => {
  const user = await authRepository.findByEmail(email);
  if (!user) throw new Error("User not found");

  const otp = generateOTP();
  const otpHash = await hashOTP(otp);

  user.otpHash = otpHash;
  user.otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);

  await authRepository.saveUser(user);

  console.log("Resend OTP:", otp);

  return { email: user.email };
};

/* ---------------- FORGOT PASSWORD ---------------- */
const forgotPassword = async ({ email }) => {
  const user = await authRepository.findByEmail(email);
  if (!user) throw new Error("User not found");

  const otp = generateOTP();
  const otpHash = await hashOTP(otp);

  user.otpHash = otpHash;
  user.otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);

  await authRepository.saveUser(user);

  console.log("Forgot OTP:", otp);

  return { email: user.email };
};

/* ---------------- REFRESH TOKEN ---------------- */
const refreshToken = async ({ refreshToken }) => {
  const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

  const user = await authRepository.findByEmail(decoded.email);
  if (!user) throw new Error("User not found");

  const newAccessToken = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );

  return { accessToken: newAccessToken };
};

/* ---------------- LOGOUT ---------------- */
const logout = async () => {
  return { message: "Logged out successfully" };
};


/* ---------------- EXPORT ---------------- */
module.exports = {
  register,
  verifyOtp,
  setPassword,
  loginPassword,
  loginOtp,
  verifyLoginOtp,
  resendOtp,
  forgotPassword,
  refreshToken,
  logout,
};