import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Profile = () => {
  const { user } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const memberSince = user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Recently';

  return (
    <div className="page-wrapper">
      <nav className="top-navbar">
        <Link to="/dashboard" className="navbar-brand">
          <div className="brand-logo-box">
            <i className="bi bi-shield-lock-fill"></i>
          </div>
          <span>SecureAuth</span>
        </Link>
        <div className="navbar-actions">
          <button className="btn-theme-toggle" onClick={toggleTheme}>
            <i className={`bi ${isDarkMode ? 'bi-sun-fill' : 'bi-moon-stars-fill'}`}></i>
          </button>
          <Link to="/dashboard" className="btn btn-outline-secondary btn-sm" style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}>
            <i className="bi bi-arrow-left me-2"></i> Back to Dashboard
          </Link>
        </div>
      </nav>

      <main className="content-layout">
        <div className="welcome-hero animate-slide-up">
          <div>
            <h1>User Profile</h1>
            <p>Manage your account settings and preferences.</p>
          </div>
        </div>

        <div className="glass-card p-4 p-md-5 animate-slide-up" style={{ animationDelay: '0.1s', maxWidth: '800px', margin: '0 auto' }}>
          <div className="d-flex flex-column align-items-center mb-5 text-center">
            <div className="avatar-lg mb-3" style={{ width: '100px', height: '100px', fontSize: '2.5rem' }}>
              {getInitials(user?.name)}
            </div>
            <h2 className="mb-1">{user?.name}</h2>
            <p style={{ color: 'var(--text-muted)' }}>{user?.email}</p>
            <span className="badge bg-success bg-opacity-10 text-success border border-success rounded-pill px-3 py-1 mt-2">Active Member</span>
          </div>

          <div className="row g-4">
            <div className="col-md-6">
              <label className="info-label mb-2">Full Name</label>
              <div className="custom-input bg-opacity-50">{user?.name}</div>
            </div>
            <div className="col-md-6">
              <label className="info-label mb-2">Email Address</label>
              <div className="custom-input bg-opacity-50">{user?.email}</div>
            </div>
            <div className="col-md-6">
              <label className="info-label mb-2">User ID</label>
              <div className="custom-input bg-opacity-50 font-monospace text-muted">{user?.id}</div>
            </div>
            <div className="col-md-6">
              <label className="info-label mb-2">Member Since</label>
              <div className="custom-input bg-opacity-50">{memberSince}</div>
            </div>
          </div>
          
          <hr className="my-5" style={{ borderColor: 'var(--border-color)' }} />
          
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
             <div>
               <h5 className="mb-1 text-danger">Danger Zone</h5>
               <p className="mb-0" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Permanently delete your account and data.</p>
             </div>
             <button className="btn btn-outline-danger" disabled>Delete Account</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
