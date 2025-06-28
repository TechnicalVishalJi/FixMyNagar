// auth.js
// Express routes for signup/Login with OTP, JWT, and MongoDB Atlas

const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');
const { authenticator } = require('otplib');
const Brevo = require('@getbrevo/brevo');
const jwt = require('jsonwebtoken');
require('dotenv').config();

authenticator.options = { window: 1 }; // Allow 1 time step window for OTP verification

// Initialize Brevo client
const brevoClient = new Brevo.TransactionalEmailsApi();
brevoClient.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

const router = express.Router();

// helper: send OTP email
async function sendOtpEmail(email, token) {
  await brevoClient.sendTransacEmail({
    subject: 'Your FixMyNagar OTP',
    sender: { email: process.env.OTP_SENDER_EMAIL},
    to: [{ email }],
    htmlContent: `<p>Your OTP is <strong>${token}</strong> – it expires in 1 minute.</p>`
  });
}

// Signup: request OTP
router.post('/auth/signup', async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'Name and email required' });

  let token;
  
  try {
    const existing = await User.findOne({ email });
    // Check if user is already fully registered (has no otpSecret or expired OTP means verified)
    if (existing && existing.isVerified) {
      return res.status(400).json({ error: 'Email is already registered' });
    }    
  
    const secret = authenticator.generateSecret();
    token = authenticator.generate(secret);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await User.updateOne(
        { email },
        { name, email, otpSecret: secret, otpExpiresAt: expiresAt, isVerified: false, verifiedAt: null },
        { upsert: true }
    );
  } catch (err) {
    if (err.code === 11000) {
        return res.status(400).json({ error: 'Email is already registered' });
    }
    throw err;
  }

  await sendOtpEmail(email, token);
  res.json({ message: 'Signup OTP sent' });
});

// Signup: verify OTP
router.post('/auth/signup/verify', async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: 'User not found' });
  if (user.otpExpiresAt < new Date()){
    await User.updateOne(
        { email },
        { 
          $unset: { 
            otpSecret: 1, 
            otpExpiresAt: 1 
          } 
        }
      );
    return res.status(400).json({ error: 'OTP expired' });
  }

  const valid = authenticator.check(otp, user.otpSecret);
  if (!valid) return res.status(400).json({ error: 'Invalid OTP' });

  // Complete registration - remove OTP fields and mark as verified
  await User.updateOne(
    { email },
    { 
      $unset: { 
        otpSecret: 1, 
        otpExpiresAt: 1 
      },
      $set: {
        isVerified: true,
        verifiedAt: new Date()
      }
    }
  );

  const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });

  res.cookie('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({ user: { id: user._id, name: user.name, email: user.email } });
});

// Login: request OTP
router.post('/auth/login', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: 'Email not registered' });

  const secret = authenticator.generateSecret();
  const token = authenticator.generate(secret);
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  user.otpSecret = secret;
  user.otpExpiresAt = expiresAt;
  await user.save();

  await sendOtpEmail(email, token);
  res.json({ message: 'Login OTP sent' });
});

// Login: verify OTP
router.post('/auth/login/verify', async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: 'User not found' });
  if (user.otpExpiresAt < new Date()) return res.status(400).json({ error: 'OTP expired' });

  const valid = authenticator.check(otp, user.otpSecret);
  if (!valid) return res.status(400).json({ error: 'Invalid OTP' });

  const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });

  res.cookie('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({ user: { id: user._id, name: user.name, email: user.email } });
});

// Authenticated route: get user info
router.post('/auth/me', async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(200).json({ error: 'User not found' });
    res.json({ user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
});

// POST /auth/logout
router.post('/auth/logout', (req, res) => {
  // Clear the JWT token cookie
  res.clearCookie('token', {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
    path: '/'
  });
  res.json({ message: 'Logged out successfully' });
});


module.exports = router;
