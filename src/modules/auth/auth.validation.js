const { z } = require("zod");

/* ---------------- REGISTER VALIDATION ---------------- */
const registerSchema = z.object({
  name: z.string().min(2, "Name is required").trim(),

  email: z.string().email("Invalid email").trim().toLowerCase(),

  phone: z
    .string()
    .min(10, "Phone must be 10 digits")
    .max(15)
    .trim(),

  password: z
    .string()
    .min(6, "Password too short")
    .optional(),
});

/* ---------------- OTP VALIDATION ---------------- */
const otpSchema = z.object({
  email: z.string().email().trim().toLowerCase(),
  otp: z.string().min(4).max(8),
});

/* ---------------- LOGIN VALIDATION ---------------- */
const loginSchema = z.object({
  email: z.string().email().trim().toLowerCase(),
  password: z.string().min(6),
});

/* ---------------- LOGIN OTP VALIDATION ---------------- */
const loginOtpSchema = z.object({
  email: z.string().email().trim().toLowerCase(),
});

/* ---------------- RESET PASSWORD ---------------- */
const resetPasswordSchema = z.object({
  email: z.string().email().trim().toLowerCase(),
  otp: z.string().min(4).max(8),
  newPassword: z.string().min(6, "Password too weak"),
});

module.exports = {
  registerSchema,
  otpSchema,
  loginSchema,
  loginOtpSchema,
  resetPasswordSchema,
};