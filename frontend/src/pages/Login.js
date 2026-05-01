// src/pages/Login.js - Premium Theme Login Page
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../api/authAPI';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.email.trim() || !formData.password) {
      setError('Please enter your email and password.');
      return;
    }

    setLoading(true);
    try {
      const data = await loginUser(formData);
      login(data);
      setSuccess('Authentication successful! Securing connection...');
      setTimeout(() => navigate('/dashboard'), 1200);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
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
              <i className="bi bi-shield-lock-fill"></i>
            </div>
            <h1>Welcome Back</h1>
            <p>Access your secure dashboard</p>
          </div>

          {error && (
            <div className="alert-custom alert-error mb-4">
              <i className="bi bi-exclamation-triangle-fill"></i> {error}
            </div>
          )}
          {success && (
            <div className="alert-custom alert-success mb-4">
              <i className="bi bi-shield-check"></i> {success}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-4">
              <label className="info-label mb-2 d-block">Email Address</label>
              <div className="input-icon-wrapper">
                <i className="bi bi-envelope icon-left"></i>
                <input
                  type="email"
                  name="email"
                  className="form-control custom-input with-icon"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-5">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <label className="info-label mb-0">Password</label>
                <Link to="/forgot-password" className="auth-link" style={{ fontSize: '0.85rem' }}>Forgot password?</Link>
              </div>
              <div className="input-icon-wrapper">
                <i className="bi bi-lock icon-left"></i>
                <input
                  type={showPass ? 'text' : 'password'}
                  name="password"
                  className="form-control custom-input with-icon"
                  placeholder="Enter your secure password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="icon-right-btn"
                  onClick={() => setShowPass(!showPass)}
                >
                  <i className={`bi ${showPass ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                </button>
              </div>
            </div>

            <button type="submit" className="btn-primary-gradient w-100 py-3 d-flex justify-content-center align-items-center gap-2" disabled={loading}>
              {loading ? (
                <><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Authenticating...</>
              ) : (
                <><i className="bi bi-box-arrow-in-right"></i> Secure Sign In</>
              )}
            </button>
          </form>

          <div className="auth-footer-text mt-4">
            New to SecureAuth? <Link to="/register" className="auth-link">Create an account</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
