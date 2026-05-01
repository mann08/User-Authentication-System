// src/pages/Register.js - Premium Theme Register Page
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../api/authAPI';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();

  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const validate = () => {
    const { name, email, password, confirmPassword } = formData;
    if (!name.trim() || !email.trim() || !password || !confirmPassword) return 'All fields are required.';
    if (password.length < 6) return 'Password must be at least 6 characters.';
    if (password !== confirmPassword) return 'Passwords do not match.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const validationError = validate();
    if (validationError) { setError(validationError); return; }

    setLoading(true);
    try {
      const { confirmPassword, ...registerData } = formData;
      const data = await registerUser(registerData);
      login(data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
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
              <i className="bi bi-person-plus-fill"></i>
            </div>
            <h1>Create Account</h1>
            <p>Join our secure platform today</p>
          </div>

          {error && (
            <div className="alert-custom alert-error mb-4">
              <i className="bi bi-exclamation-triangle-fill"></i> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-4">
              <label className="info-label mb-2 d-block">Full Name</label>
              <div className="input-icon-wrapper">
                <i className="bi bi-person icon-left"></i>
                <input
                  type="text"
                  name="name"
                  className="form-control custom-input with-icon"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

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

            <div className="mb-4">
              <label className="info-label mb-2 d-block">Password</label>
              <div className="input-icon-wrapper">
                <i className="bi bi-lock icon-left"></i>
                <input
                  type={showPass ? 'text' : 'password'}
                  name="password"
                  className="form-control custom-input with-icon"
                  placeholder="Create a strong password"
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

            <div className="mb-5">
              <label className="info-label mb-2 d-block">Confirm Password</label>
              <div className="input-icon-wrapper">
                <i className="bi bi-check-circle icon-left"></i>
                <input
                  type={showConfirmPass ? 'text' : 'password'}
                  name="confirmPassword"
                  className="form-control custom-input with-icon"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="icon-right-btn"
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                >
                  <i className={`bi ${showConfirmPass ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                </button>
              </div>
            </div>

            <button type="submit" className="btn-primary-gradient w-100 py-3 d-flex justify-content-center align-items-center gap-2" disabled={loading}>
              {loading ? (
                <><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Processing...</>
              ) : (
                <><i className="bi bi-person-plus"></i> Create Account</>
              )}
            </button>
          </form>

          <div className="auth-footer-text mt-4">
            Already have an account? <Link to="/login" className="auth-link">Sign in here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
