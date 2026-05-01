// routes/authRoutes.js - Auth API Routes
const express = require('express');
const router = express.Router();

// Import controller functions
const { registerUser, loginUser, getUserProfile } = require('../controllers/authController');

// Import JWT protection middleware
const protect = require('../middleware/authMiddleware');

// =============================================
// Public Routes (no token required)
// =============================================

// POST /api/auth/register - Create a new user account
router.post('/register', registerUser);

// POST /api/auth/login - Log in with email & password
router.post('/login', loginUser);

// =============================================
// Protected Routes (valid JWT required)
// =============================================

// GET /api/auth/profile - Get current user profile
// The protect middleware runs first to verify the token
router.get('/profile', protect, getUserProfile);

module.exports = router;
