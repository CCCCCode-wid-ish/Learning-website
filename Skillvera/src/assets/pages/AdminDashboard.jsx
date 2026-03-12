import React from 'react';
import { BarChart, LineChart } from '../components/Charts';
import { Users, BookOpen, GraduationCap } from 'lucide-react';

const AdminDashboard = () => {

  const studentEngagementData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Active Students',
        data: [150, 180, 220, 210, 250, 190, 160],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
      },
    ],
  };

  const teacherActivityData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Materials Uploaded',
        data: [12, 19, 15, 22],
        backgroundColor: 'rgba(37, 99, 235, 0.6)',
      },
    ],
  };

  return (
    <div className="container" style={{ padding: '2rem 1.5rem', minHeight: '80vh' }}>
      <div className="animate-fade-in">
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>Admin Dashboard</h1>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn btn-secondary">Manage Teachers</button>
            <button className="btn btn-secondary">Manage Students</button>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Users size={40} color="var(--primary)" />
            <div>
              <h3 style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Total Teachers</h3>
              <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>42</p>
            </div>
          </div>
          
          <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <GraduationCap size={40} color="var(--accent)" />
            <div>
              <h3 style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Total Students</h3>
              <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>350</p>
            </div>
          </div>
          
          <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <BookOpen size={40} color="#f59e0b" />
            <div>
              <h3 style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Active Courses</h3>
              <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>24</p>
            </div>
          </div>
        </div>

        {/* Analytics Section */}
        <h2 className="mb-6" style={{ fontSize: '1.5rem', fontWeight: 600 }}>Engagement & Activity</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <LineChart data={studentEngagementData} title="Student Engagement" />
          <BarChart data={teacherActivityData} title="Teacher Activity" />
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
