import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { User } from '../models/userModels.js';

// GET: Forgot Password Page
export const showForgotPassword = (req, res) => {
  res.render('forgot-password', { error: null, success: null });
};

// POST: Handle forgot password form submission
export const handleForgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).render('forgot-password', {
      error: 'Email not found',
      success: null,
    });
  }

  const token = crypto.randomBytes(32).toString('hex');
  user.resetToken = token;
  user.tokenExpiry = Date.now() + 3600000; // 1 hour
  await user.save();

  const resetLink = `http://localhost:3000/reset-password/${token}`;
  console.log(`📧 Reset link: ${resetLink}`);

  res.render('forgotPasswordSuccess', {
    error: null,
    success: 'Reset link sent. Check your email.',
  });
};

// GET: Show reset password form with token
export const showResetPassword = async (req, res) => {
  const { token } = req.params;
  const user = await User.findOne({
    resetToken: token,
    tokenExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return res.render('reset-password', {
      token: null,
      error: 'Token is invalid or expired',
      success: null,
    });
  }

  res.render('reset-password', {
    token,
    error: null,
    success: null,
  });
};

// POST: Handle reset password form submission
export const handleResetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({
    resetToken: token,
    tokenExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return res.render('reset-password', {
      token: null,
      error: 'Token expired or invalid',
      success: null,
    });
  }

  user.password = await bcrypt.hash(password, 10);
  user.resetToken = undefined;
  user.tokenExpiry = undefined;
  await user.save();

  res.render('login', {
    error: null,
    success: 'Password successfully reset. Please login.',
  });
};
