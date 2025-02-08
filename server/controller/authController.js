import express from "express";
import User from "../model/UserSchema.js";
import twilio from "twilio";
import bodyParser from "body-parser";

const router = express.Router();

app.use(bodyParser.json());

const accountSid = "your_twilio_account_sid";
const authToken = "your_twilio_auth_token";
const client = twilio(accountSid, authToken);

// Store OTPs temporarily (you can replace this with a database for persistence)
let otpStore = {};

export const loginUser = async (req, res) => {
  const { role, phone, password } = req.body;
  const exists = await User.findOne({ phone });
  if (!exists) {
    return res.json({ error: "Phone No is not registered" });
  }
  return res.json({ success: "Login Successful!" });
};

export const registerUser = async (req, res) => {
  try {
    const { role, fname, lname, phone, password } = req.body;
    const exists = await User.findOne({ phone });
    if (exists) {
      return res.json({ error: "Phone number is already taken" });
    }

    const user = await User.create({ role, fname, lname, phone, password });
    return res.json({ success: "User registered successfully", user });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Server error during registration" });
  }
};

// OTP related routes
export const sendOtp = async (req, res) => {
  const { phone } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP

  try {
    // Send OTP via Twilio SMS
    await client.messages.create({
      body: `Your OTP is ${otp}`,
      to: phone, // The phone number to send OTP to
      from: "your_twilio_phone_number", // Your Twilio phone number
    });

    // Store OTP temporarily (you may want to store it in a database)
    otpStore[phone] = otp;

    res.json({ success: true, message: "OTP sent successfully." });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Failed to send OTP." });
  }
};

export const verifyOtp = (req, res) => {
  const { phone, otp } = req.body;

  if (otpStore[phone] && otpStore[phone] === otp) {
    delete otpStore[phone]; // OTP is valid, delete it
    res.json({ success: true, message: "OTP verified successfully." });
  } else {
    res.json({ success: false, message: "Invalid OTP." });
  }
};

// Route for sending OTP (make sure to add this route to your router)
router.post("/send-otp", sendOtp);

// Route for verifying OTP (make sure to add this route to your router)
router.post("/verify-otp", verifyOtp);

export default router;
