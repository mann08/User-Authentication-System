// src/api/authAPI.js - Centralized API calls for authentication
import axios from 'axios';

// Base URL: uses the proxy defined in package.json (http://localhost:5000)
const API_BASE = '/api/auth';

/**
 * registerUser - Sends registration data to the backend
 * @param {Object} userData - { name, email, password }
 * @returns {Object} - response data (token + user)
 */
export const registerUser = async (userData) => {
  const response = await axios.post(`${API_BASE}/register`, userData);
  return response.data;
};

/**
 * loginUser - Sends login credentials to the backend
 * @param {Object} credentials - { email, password }
 * @returns {Object} - response data (token + user)
 */
export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_BASE}/login`, credentials);
  return response.data;
};

/**
 * getUserProfile - Fetches the current user's profile (protected)
 * Requires a valid JWT token in localStorage
 * @returns {Object} - response data (user profile)
 */
export const getUserProfile = async () => {
  // Retrieve the stored token
  const token = localStorage.getItem('authToken');

  // Set the Authorization header with the Bearer token
  const response = await axios.get(`${API_BASE}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
