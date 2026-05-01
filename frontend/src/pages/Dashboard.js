// src/pages/Dashboard.js - Premium Authentication Dashboard
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserProfile } from '../api/authAPI';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch profile to verify token validity on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setProfile(data.user);
      } catch (err) {
        const msg = err.response?.data?.message || 'Session expired. Please log in again.';
        setError(msg);
        if (err.response?.status === 401) {
          setTimeout(() => { logout(); navigate('/login'); }, 2000);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [logout, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const displayUser = profile || user;
  const memberSince = displayUser?.createdAt 
    ? new Date(displayUser.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'N/A';

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="loader"></div>
        <p>Loading your secure dashboard...</p>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      {/* ---------- Navbar ---------- */}
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
          <Link to="/profile" className="btn-theme-toggle text-decoration-none" title="Profile">
            <i className="bi bi-person-fill"></i>
          </Link>
          <button className="btn btn-outline-danger btn-sm rounded-pill px-3 fw-medium" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right me-1"></i> Logout
          </button>
        </div>
      </nav>

      {/* ---------- Main Content ---------- */}
      <main className="content-layout">
        {error && (
          <div className="alert-custom alert-error mb-4 animate-slide-up">
            <i className="bi bi-exclamation-octagon-fill"></i> {error}
          </div>
        )}

        {/* Welcome Hero */}
        <div className="welcome-hero animate-slide-up">
          <div className="d-flex align-items-center gap-4">
            <div className="avatar-lg">
              {getInitials(displayUser?.name)}
            </div>
            <div>
              <h1>Welcome back, <span className="text-gradient">{displayUser?.name?.split(' ')[0] || 'User'}</span></h1>
              <p>Your secure authentication dashboard overview.</p>
            </div>
          </div>
          <div className="status-pill d-none d-md-flex mt-3 mt-md-0">
             <div className="pulse-dot"></div> Active Session Valid
          </div>
        </div>

        {/* Information Grid Premium */}
        <div className="info-grid-premium">
          {/* Name Card */}
          <div className="glass-card info-card-premium animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="info-icon-wrapper icon-purple">
              <i className="bi bi-person-vcard"></i>
            </div>
            <div className="info-data-wrapper">
              <p className="info-label">Full Name</p>
              <h4 className="info-value">{displayUser?.name || 'N/A'}</h4>
            </div>
          </div>

          {/* Email Card */}
          <div className="glass-card info-card-premium animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="info-icon-wrapper icon-cyan">
              <i className="bi bi-envelope-at"></i>
            </div>
            <div className="info-data-wrapper">
              <p className="info-label">Email Address</p>
              <h4 className="info-value">{displayUser?.email || 'N/A'}</h4>
            </div>
          </div>

          {/* Member Since Card */}
          <div className="glass-card info-card-premium animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="info-icon-wrapper icon-green">
              <i className="bi bi-calendar2-check"></i>
            </div>
            <div className="info-data-wrapper">
              <p className="info-label">Member Since</p>
              <h4 className="info-value">{memberSince}</h4>
            </div>
          </div>

          {/* Last Login Card */}
          <div className="glass-card info-card-premium animate-slide-up" style={{ animationDelay: '0.4s' }}>
             <div className="info-icon-wrapper icon-amber">
              <i className="bi bi-clock-history"></i>
            </div>
            <div className="info-data-wrapper">
              <p className="info-label">Last Login</p>
              <h4 className="info-value">Just Now</h4>
            </div>
          </div>
          
           {/* Security Status Card */}
           <div className="glass-card info-card-premium animate-slide-up" style={{ animationDelay: '0.5s', gridColumn: '1 / -1' }}>
             <div className="info-icon-wrapper icon-rose">
              <i className="bi bi-shield-check"></i>
            </div>
            <div className="info-data-wrapper d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
              <div>
                <p className="info-label">Security Protocol</p>
                <h4 className="info-value mb-1">High Security Enforced</h4>
                <p className="mb-0 text-muted" style={{ fontSize: '0.9rem' }}>Account protected by bcrypt hashing and JSON Web Tokens.</p>
              </div>
              <Link to="/profile" className="btn btn-outline-secondary" style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}>
                View Full Profile <i className="bi bi-arrow-right ms-1"></i>
              </Link>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default Dashboard;
