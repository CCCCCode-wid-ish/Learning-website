import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';

const Login = () => {
  const [activeTab, setActiveTab] = useState('superadmin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    
    // For demo purposes, we will mock the login flow and navigate directly
    // since we don't have a real backend standing by
    if (activeTab === 'admin' && email.includes('pending')) {
      setErrorMsg('Your account is pending approval.');
      return;
    }

    try {
      // simulate API call
      // const res = await loginUser({ email, password, role: activeTab });
      
      if (activeTab === 'superadmin') {
        navigate('/dashboard/superadmin');
      } else {
        navigate('/dashboard/admin');
      }
    } catch (err) {
      setErrorMsg('Login failed. Please try again.');
    }
  };

  return (
    <div className="container" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="card animate-fade-in" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-6" style={{ fontSize: '1.5rem', fontWeight: 600 }}>Welcome Back</h2>
        
        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', borderBottom: '1px solid var(--secondary-dark)', paddingBottom: '0.5rem' }}>
          <button 
            type="button"
            style={{ 
              flex: 1, 
              padding: '0.5rem', 
              background: 'none', 
              border: 'none', 
              borderBottom: activeTab === 'superadmin' ? '2px solid var(--primary)' : '2px solid transparent',
              color: activeTab === 'superadmin' ? 'var(--primary)' : 'var(--text-secondary)',
              fontWeight: activeTab === 'superadmin' ? 600 : 500,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onClick={() => setActiveTab('superadmin')}
          >
            Super Admin
          </button>
          <button 
            type="button"
            style={{ 
              flex: 1, 
              padding: '0.5rem', 
              background: 'none', 
              border: 'none', 
              borderBottom: activeTab === 'admin' ? '2px solid var(--primary)' : '2px solid transparent',
              color: activeTab === 'admin' ? 'var(--primary)' : 'var(--text-secondary)',
              fontWeight: activeTab === 'admin' ? 600 : 500,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onClick={() => setActiveTab('admin')}
          >
            Admin
          </button>
        </div>

        {errorMsg && (
          <div style={{ padding: '0.75rem', backgroundColor: 'var(--danger)', color: 'white', borderRadius: '0.5rem', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input 
              type="email" 
              className="form-input" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group mb-6">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-input" 
              placeholder="Enter your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.75rem' }}>
            Login as {activeTab === 'superadmin' ? 'Super Admin' : 'Admin'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
