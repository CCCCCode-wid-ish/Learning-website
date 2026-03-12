import React from 'react';
import { BarChart, PieChart } from '../components/Charts';
import { Upload, Users, Activity } from 'lucide-react';

const TeacherDashboard = () => {

  const progressData = {
    labels: ['Course A', 'Course B', 'Course C'],
    datasets: [
      {
        label: 'Average Score (%)',
        data: [85, 92, 78],
        backgroundColor: [
          'rgba(59, 130, 246, 0.6)', 
          'rgba(16, 185, 129, 0.6)', 
          'rgba(245, 158, 11, 0.6)'
        ],
      },
    ],
  };

  const completionData = {
    labels: ['Completed', 'Pending'],
    datasets: [
      {
        label: 'Assignments',
        data: [75, 25],
        backgroundColor: [
          'rgba(16, 185, 129, 0.6)', 
          'rgba(239, 68, 68, 0.6)'
        ],
      },
    ],
  };

  return (
    <div className="container" style={{ padding: '2rem 1.5rem', minHeight: '80vh' }}>
      <div className="animate-fade-in">
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>Teacher Workspace</h1>
        </div>
        
        {/* Quick Actions / Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          <button className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', border: 'none', cursor: 'pointer' }}>
            <Upload size={40} color="var(--primary)" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Upload Materials</h3>
          </button>
          
          <button className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', border: 'none', cursor: 'pointer' }}>
            <Users size={40} color="var(--accent)" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>View Students</h3>
          </button>
          
          <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <Activity size={40} color="#f59e0b" />
            <div>
              <h3 style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Track Progress</h3>
              <p style={{ fontSize: '1.25rem', fontWeight: 700 }}>Active Classes: 3</p>
            </div>
          </div>

        </div>

        {/* Analytics Section */}
        <h2 className="mb-6" style={{ fontSize: '1.5rem', fontWeight: 600 }}>Class Performance Insights</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <BarChart data={progressData} title="Class Average Scores" />
          <PieChart data={completionData} title="Assignment Completion Rate" />
        </div>

      </div>
    </div>
  );
};

export default TeacherDashboard;
