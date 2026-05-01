// controllers/authController.js - Business Logic for Authentication
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// =============================================
// Helper: Generate JWT Token
// =============================================

/**
 * generateToken - Creates a signed JWT token
 * @param {Object} user - Mongoose user document
 * @returns {string} - Signed JWT token (expires in 7 days)
 */
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' } // Token is valid for 7 days
  );
};

// =============================================
// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
// =============================================

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // --- Input Validation ---
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide name, email, and password.',
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: 'Password must be at least 6 characters long.',
    });
  }

  try {
    // --- Check if email is already registered ---
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email already exists.',
      });
    }

    // --- Hash the password before saving ---
    // bcrypt generates a salt and hashes the password in one step
    // Salt rounds = 10 (higher = more secure but slower)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // --- Create new user document ---
    const newUser = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
    });

    // --- Generate JWT token ---
    const token = generateToken(newUser);

    // --- Respond (never expose the password) ---
    res.status(201).json({
      success: true,
      message: 'Account created successfully!',
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        createdAt: newUser.createdAt,
      },
    });
  } catch (error) {
    console.error('Register error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
    });
  }
};

// =============================================
// @route   POST /api/auth/login
// @desc    Login user and return JWT token
// @access  Public
// =============================================

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // --- Input Validation ---
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide email and password.',
    });
  }

  try {
    // --- Find user by email ---
    const user = await User.findOne({ email: email.toLowerCase() });

    // Use a generic message (don't reveal whether email or password is wrong)
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    // --- Compare entered password with stored hashed password ---
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    // --- Generate JWT token ---
    const token = generateToken(user);

    // --- Respond with token and user info ---
    res.status(200).json({
      success: true,
      message: 'Login successful!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
    });
  }
};

// =============================================
// @route   GET /api/auth/profile
// @desc    Get logged-in user profile (protected)
// @access  Private (requires valid JWT)
// =============================================

const getUserProfile = async (req, res) => {
  try {
    // req.user is set by the protect middleware after verifying the token
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('Profile error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
    });
  }
};

module.exports = { registerUser, loginUser, getUserProfile };
