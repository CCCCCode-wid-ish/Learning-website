import React, { useState } from 'react';
import { BarChart, PieChart, LineChart, chartMockData } from '../components/Charts';
import { Users, UserCog, UserCheck, AlertCircle, TrendingUp, CheckCircle, XCircle } from 'lucide-react';

const mockRequests = [
  { id: 1, name: 'Alice Smith', email: 'alice@school.edu', role: 'Teacher', status: 'Pending' },
  { id: 2, name: 'Bob Johnson', email: 'bob@college.edu', role: 'Admin', status: 'Pending' },
  { id: 3, name: 'Charlie Davis', email: 'charlie@student.edu', role: 'Student', status: 'Pending' },
];

const SuperAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [requests, setRequests] = useState(mockRequests);

  const handleApprove = (id) => {
    setRequests(requests.filter(req => req.id !== id));
    alert(`Approved request ${id}`);
  };

  const handleReject = (id) => {
    setRequests(requests.filter(req => req.id !== id));
    alert(`Rejected request ${id}`);
  };

  return (
    <div className="container" style={{ display: 'flex', minHeight: '80vh', gap: '2rem', padding: '2rem 1.5rem' }}>
      
      {/* Sidebar Navigation */}
      <aside style={{ width: '250px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>Super Admin</h2>
        
        {['dashboard', 'requests', 'analytics'].map(tab => (
          <button
            key={tab}
            className={`btn ${activeTab === tab ? 'btn-primary' : 'btn-secondary'}`}
            style={{ justifyContent: 'flex-start', width: '100%', textTransform: 'capitalize', borderRadius: '0.5rem' }}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'dashboard' && <TrendingUp size={18} />}
            {tab === 'requests' && <AlertCircle size={18} />}
            {tab === 'analytics' && <PieChart size={18} />}
            {tab === 'analytics' ? 'Analytics' : tab === 'requests' ? 'Pending Requests' : 'Dashboard'}
          </button>
        ))}
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {activeTab === 'dashboard' && (
          <div className="animate-fade-in">
            <h2 className="mb-6" style={{ fontSize: '1.75rem', fontWeight: 600 }}>Dashboard Summary</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Users size={40} color="var(--primary)" />
                <div>
                  <h3 style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Total Students</h3>
                  <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>350</p>
                </div>
              </div>
              <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <UserCheck size={40} color="var(--accent)" />
                <div>
                  <h3 style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Total Teachers</h3>
                  <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>42</p>
                </div>
              </div>
              <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <UserCog size={40} color="var(--danger)" />
                <div>
                  <h3 style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Total Admins</h3>
                  <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>5</p>
                </div>
              </div>
              <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <AlertCircle size={40} color="#f59e0b" />
                <div>
                  <h3 style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Pending Requests</h3>
                  <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>{requests.length}</p>
                </div>
              </div>
            </div>

            <h2 className="mb-4" style={{ fontSize: '1.25rem', fontWeight: 600 }}>Quick Analytics Preview</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <BarChart data={chartMockData.rolesDistribution} title="Users By Role" />
              <PieChart data={chartMockData.rolesDistribution} title="Platform Distribution" />
            </div>
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="animate-fade-in">
            <h2 className="mb-6" style={{ fontSize: '1.75rem', fontWeight: 600 }}>Pending Access Requests</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {requests.length === 0 ? (
                <div className="card text-center text-light">No pending requests natively available.</div>
              ) : (
                requests.map(req => (
                  <div key={req.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem' }}>
                    <div>
                      <h3 style={{ fontWeight: 600 }}>{req.name} <span style={{ fontSize: '0.75rem', backgroundColor: 'var(--secondary-dark)', padding: '0.2rem 0.5rem', borderRadius: '1rem', marginLeft: '0.5rem' }}>{req.role}</span></h3>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{req.email}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn btn-accent" onClick={() => handleApprove(req.id)} style={{ padding: '0.5rem' }}>
                        <CheckCircle size={18} /> Approve
                      </button>
                      <button className="btn btn-danger" onClick={() => handleReject(req.id)} style={{ padding: '0.5rem' }}>
                        <XCircle size={18} /> Reject
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="animate-fade-in">
            <h2 className="mb-6" style={{ fontSize: '1.75rem', fontWeight: 600 }}>Detailed Analytics</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <BarChart data={chartMockData.rolesDistribution} title="Users By Role Overview" />
              <PieChart data={chartMockData.rolesDistribution} title="Overall Distribution" />
              <div className="md:col-span-2">
                <LineChart data={chartMockData.growthData} title="Growth Trends" />
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default SuperAdminDashboard;
