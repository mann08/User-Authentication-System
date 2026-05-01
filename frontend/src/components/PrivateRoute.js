// src/components/PrivateRoute.js - Protects frontend routes
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * PrivateRoute - A wrapper component that guards protected pages.
 *
 * Usage:
 *   <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
 *
 * Behavior:
 *   - If the user is authenticated (has a valid token in localStorage), render children.
 *   - If not authenticated, redirect to the /login page.
 */
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Redirect unauthenticated users to the login page
    // 'replace' replaces the current history entry so the user can't "go back" to the protected route
    return <Navigate to="/login" replace />;
  }

  // User is authenticated — render the protected component
  return children;
};

export default PrivateRoute;
