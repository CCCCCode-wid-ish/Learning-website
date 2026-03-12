import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Column 1 */}
        <div className="flex flex-col gap-4">
          <div className="navbar-brand" style={{ color: 'white' }}>
            <BookOpen color="var(--primary)" size={28} />
            <span>Skillvera</span>
          </div>
          <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
            A role-based education platform built to provide smart analytics, secure access, and a seamless learning experience.
          </p>
        </div>

        {/* Column 2 */}
        <div className="footer-nav" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/request">Register</Link>
        </div>

        {/* Column 3 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>Contact Us</h3>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#9ca3af' }}>
            <Mail size={18} />
            <span>support@skillvera.edu</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
            <a href="https://github.com" target="_blank" rel="noreferrer" style={{ color: '#9ca3af' }}>
              <Github size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{ color: '#9ca3af' }}>
              <Linkedin size={24} />
            </a>
          </div>
        </div>

      </div>
      <div className="container" style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #374151', textAlign: 'center', color: '#9ca3af', fontSize: '0.875rem' }}>
        &copy; {new Date().getFullYear()} Skillvera. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
