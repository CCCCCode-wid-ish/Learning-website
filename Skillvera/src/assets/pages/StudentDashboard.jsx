import React from 'react';
import { BarChart, LineChart, PieChart } from '../components/Charts';
import { BookOpen, Target, Award } from 'lucide-react';

const StudentDashboard = () => {

  const progressData = {
    labels: ['Course A', 'Course B', 'Course C'],
    datasets: [
      {
        label: 'Completion (%)',
        data: [100, 60, 20],
        backgroundColor: 'rgba(34, 197, 94, 0.6)',
      },
    ],
  };

  const performanceTrends = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Test Scores',
        data: [70, 75, 80, 85, 90],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      },
    ],
  };

  const completedModules = {
    labels: ['Completed', 'Remaining'],
    datasets: [
      {
        data: [12, 5],
        backgroundColor: [
          'rgba(34, 197, 94, 0.6)', 
          'rgba(243, 244, 246, 1)'
        ],
      },
    ],
  };

  return (
    <div className="container" style={{ padding: '2rem 1.5rem', minHeight: '80vh' }}>
      <div className="animate-fade-in">
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>Student Dashboard</h1>
        </div>
        
        {/* Quick Actions / Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          <button className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
            <BookOpen size={40} color="var(--primary)" />
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>My Courses</h3>
              <p style={{ color: 'var(--text-secondary)' }}>View active materials</p>
            </div>
          </button>
          
          <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Target size={40} color="var(--accent)" />
            <div>
              <h3 style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Overall Progress</h3>
              <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>60%</p>
            </div>
          </div>
          
          <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Award size={40} color="#f59e0b" />
            <div>
              <h3 style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Certificates Earned</h3>
              <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>1</p>
            </div>
          </div>

        </div>

        {/* Analytics Section */}
        <h2 className="mb-6" style={{ fontSize: '1.5rem', fontWeight: 600 }}>My Learning Analytics</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <BarChart data={progressData} title="Learning Progress By Course" />
          <PieChart data={completedModules} title="Modules Completion" />
        </div>
        <div className="card">
          <LineChart data={performanceTrends} title="Performance Trends Over Time" />
        </div>

      </div>
    </div>
  );
};

export default StudentDashboard;
