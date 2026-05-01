import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Landing = () => {
  const { isAuthenticated } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();

  // If already logged in, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="page-wrapper">
      {/* Navbar */}
      <nav className="top-navbar">
        <div className="navbar-brand">
          <div className="brand-logo-box">
            <i className="bi bi-shield-lock-fill"></i>
          </div>
          <span>SecureAuth</span>
        </div>
        <div className="navbar-actions">
          <button className="btn-theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            <i className={`bi ${isDarkMode ? 'bi-sun-fill' : 'bi-moon-stars-fill'}`}></i>
          </button>
          <Link to="/login" className="auth-link me-3">Login</Link>
          <Link to="/register" className="btn-primary-gradient" style={{ textDecoration: 'none' }}>
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="d-flex flex-column align-items-center justify-content-center flex-grow-1 text-center px-3">
        <div className="animate-slide-up" style={{ maxWidth: '800px' }}>
          <div className="mb-4">
            <span className="badge bg-primary bg-opacity-10 text-primary border border-primary px-3 py-2 rounded-pill fw-medium mb-3">
              <i className="bi bi-stars me-2"></i> Next-Gen Authentication
            </span>
          </div>
          <h1 className="display-4 fw-bold mb-4">
            Secure Access, <span className="text-gradient">Simplified.</span>
          </h1>
          <p className="lead mb-5" style={{ color: 'var(--text-secondary)' }}>
            Experience enterprise-grade security with a beautifully crafted, fully themeable user interface. Powered by JWT and React.
          </p>
          <div className="d-flex gap-3 justify-content-center">
            <Link to="/register" className="btn-primary-gradient btn-lg d-flex align-items-center gap-2">
              Create Free Account <i className="bi bi-arrow-right"></i>
            </Link>
            <a href="#features" className="btn btn-outline-secondary btn-lg" style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}>
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
