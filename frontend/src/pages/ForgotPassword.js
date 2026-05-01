// src/pages/ForgotPassword.js - Premium Theme Forgot Password Page
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const ForgotPassword = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }

    setLoading(true);
    // Simulate API call for demonstration purposes
    setTimeout(() => {
      setLoading(false);
      setSuccess('If an account exists for this email, you will receive password reset instructions.');
    }, 1500);
  };

  return (
    <div className="page-wrapper">
      {/* Mini Navbar for Theme Toggle */}
      <div className="p-3 d-flex justify-content-end">
        <button className="btn-theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          <i className={`bi ${isDarkMode ? 'bi-sun-fill' : 'bi-moon-stars-fill'}`}></i>
        </button>
      </div>

      <div className="auth-container">
        <div className="glass-card auth-box animate-slide-up">
          <div className="auth-header">
             <div className="brand-logo-box mx-auto mb-3" style={{ width: '56px', height: '56px', fontSize: '1.5rem' }}>
              <i className="bi bi-key-fill"></i>
            </div>
            <h1>Reset Password</h1>
            <p>Enter your email to receive a reset link</p>
          </div>

          {error && (
            <div className="alert-custom alert-error mb-4">
              <i className="bi bi-exclamation-triangle-fill"></i> {error}
            </div>
          )}
          {success && (
            <div className="alert-custom alert-success mb-4">
              <i className="bi bi-check-circle-fill"></i> {success}
            </div>
          )}

          {!success ? (
            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-4">
                <label className="info-label mb-2 d-block">Email Address</label>
                <div className="input-icon-wrapper">
                  <i className="bi bi-envelope icon-left"></i>
                  <input
                    type="email"
                    className="form-control custom-input with-icon"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(''); }}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary-gradient w-100 py-3 d-flex justify-content-center align-items-center gap-2" disabled={loading}>
                {loading ? (
                  <><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...</>
                ) : (
                  <><i className="bi bi-send-fill"></i> Send Reset Link</>
                )}
              </button>
            </form>
          ) : (
            <Link to="/login" className="btn-primary-gradient w-100 py-3 d-flex justify-content-center align-items-center gap-2 mt-2" style={{ textDecoration: 'none' }}>
              <i className="bi bi-arrow-left"></i> Return to Login
            </Link>
          )}

          <div className="auth-footer-text mt-4">
            Remember your password? <Link to="/login" className="auth-link">Sign in here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
