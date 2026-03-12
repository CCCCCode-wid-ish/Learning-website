import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, UserCheck, BarChart3, LockKeyhole } from 'lucide-react';

const Home = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section style={{ backgroundColor: '#fff', padding: '5rem 0' }}>
        <div className="container grid md:grid-cols-2 gap-8" style={{ alignItems: 'center' }}>
          
          {/* Left Side */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'flex-start' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: 800, lineHeight: 1.2, color: 'var(--text-primary)' }}>
              Empowering Education with <span style={{ color: 'var(--primary)' }}>Role-Based Access</span>
            </h1>
            <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)' }}>
              A robust software platform tailored for educational institutions. Experience smart analytics, deep role control, and seamless workflows between Students, Teachers, and Admins.
            </p>
            <Link to="/request" className="btn btn-primary btn-lg mt-4">
              Get Started
            </Link>
          </div>
          
          {/* Right Side / Illustration Text */}
          <div style={{ padding: '2rem', backgroundColor: 'var(--secondary)', borderRadius: '1rem', border: '1px solid var(--secondary-dark)' }}>
            <div style={{
              width: '100%',
              height: '300px',
              backgroundColor: 'var(--bg-card)',
              borderRadius: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-md)',
              textAlign: 'center',
              padding: '2rem'
            }}>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--primary)', fontWeight: 600 }}>
                "Role-Based Education Platform with Smart Analytics"
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '4rem 0', backgroundColor: 'var(--bg-main)' }}>
        <div className="container">
          <h2 className="text-center mb-8" style={{ fontSize: '2.5rem', fontWeight: 700 }}>Core Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem' }}>
              <ShieldCheck size={48} color="var(--primary)" />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Role-Based Access</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Distinct features and specific workflows tailored perfectly for super-admins, admins, teachers, and students.</p>
            </div>
            
            <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem' }}>
              <UserCheck size={48} color="var(--accent)" />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Admin Approval System</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Regulate the onboarding process effectively. Users request access and are permitted sequentially by administration.</p>
            </div>
            
            <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem' }}>
              <BarChart3 size={48} color="#f59e0b" />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Analytics Dashboard</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Get wide insights into platform usages, role distributions and student performances via interactive charts.</p>
            </div>
            
            <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem' }}>
              <LockKeyhole size={48} color="var(--danger)" />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Secure Authentication</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Data protection and token-based authentication mechanism to strictly keep personal info secure.</p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
