// src/context/AuthContext.js - Global Auth State using React Context
import React, { createContext, useState, useContext } from 'react';

// Create the context object
const AuthContext = createContext();

/**
 * AuthProvider - Wraps the entire app and provides auth state to all children
 * Stores token and user info in localStorage for persistence across page refreshes
 */
export const AuthProvider = ({ children }) => {
  // Initialize state from localStorage (so auth persists on refresh)
  const [token, setToken]   = useState(() => localStorage.getItem('authToken') || null);
  const [user, setUser]     = useState(() => {
    const savedUser = localStorage.getItem('authUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(false);

  // -------------------------------------------------------
  // login - Called after successful API response
  // -------------------------------------------------------
  const login = (data) => {
    // Save token and user to state
    setToken(data.token);
    setUser(data.user);

    // Persist in localStorage
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('authUser', JSON.stringify(data.user));
  };

  // -------------------------------------------------------
  // logout - Clears all auth state and localStorage
  // -------------------------------------------------------
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
  };

  // -------------------------------------------------------
  // isAuthenticated - Boolean check for protected routes
  // -------------------------------------------------------
  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * useAuth - Custom hook for easy access to auth context
 * Usage: const { user, login, logout, isAuthenticated } = useAuth();
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
