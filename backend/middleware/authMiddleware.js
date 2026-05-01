// middleware/authMiddleware.js - JWT Verification Middleware
const jwt = require('jsonwebtoken');

/**
 * protect - Middleware to protect private routes
 *
 * This function checks for a Bearer JWT token in the Authorization header.
 * If the token is valid, the decoded user payload is attached to req.user
 * and execution passes to the next middleware/controller.
 * If the token is missing or invalid, a 401 Unauthorized response is returned.
 */
const protect = (req, res, next) => {
  // Get the Authorization header value
  const authHeader = req.headers.authorization;

  // Check if the header exists and starts with "Bearer "
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided.',
    });
  }

  // Extract the token part (after "Bearer ")
  const token = authHeader.split(' ')[1];

  try {
    // Verify the token using our secret key
    // If valid, jwt.verify returns the decoded payload (e.g., { id, name, email })
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user info to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Token is expired, tampered, or invalid
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token. Please log in again.',
    });
  }
};

module.exports = protect;
