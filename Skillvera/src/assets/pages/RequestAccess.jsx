import React, { useState } from 'react';
import { submitAccessRequest } from '../services/api';
import { UserPlus } from 'lucide-react';

const RequestAccess = () => {
  const [role, setRole] = useState(null); // 'teacher' or 'student'
  const [formData, setFormData] = useState({});
  const [successMsg, setSuccessMsg] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Mock API call
      // await submitAccessRequest({ role, ...formData });
      
      setSuccessMsg("Request submitted. Waiting for approval.");
      setRole(null);
      setFormData({});
    } catch (err) {
      console.error(err);
    }
  };

  if (successMsg) {
    return (
      <div className="container" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="card text-center animate-fade-in" style={{ maxWidth: '400px' }}>
          <UserPlus size={48} color="var(--accent)" style={{ margin: '0 auto', marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem' }}>Success!</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>{successMsg}</p>
          <button className="btn btn-secondary" onClick={() => setSuccessMsg('')}>Request Another Access</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '4rem' }}>
      
      {!role ? (
        <div className="animate-fade-in text-center">
          <h1 className="mb-8" style={{ fontSize: '2rem', fontWeight: 700 }}>Choose Your Role</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <button 
              className="card text-center"
              style={{ padding: '3rem 2rem', border: '2px solid transparent', cursor: 'pointer', transition: 'border 0.2s' }}
              onClick={() => setRole('teacher')}
              onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
              onMouseOut={(e) => e.currentTarget.style.borderColor = 'transparent'}
            >
              <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>Teacher</h2>
              <p style={{ color: 'var(--text-secondary)' }}>Educators seeking access to upload materials and track students.</p>
            </button>

            <button 
              className="card text-center"
              style={{ padding: '3rem 2rem', border: '2px solid transparent', cursor: 'pointer', transition: 'border 0.2s' }}
              onClick={() => setRole('student')}
              onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
              onMouseOut={(e) => e.currentTarget.style.borderColor = 'transparent'}
            >
              <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>Student</h2>
              <p style={{ color: 'var(--text-secondary)' }}>Learners seeking access to courses and analytics.</p>
            </button>
          </div>
        </div>
      ) : (
        <div className="card animate-fade-in" style={{ width: '100%', maxWidth: '500px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>
              Request Access as {role === 'teacher' ? 'Teacher' : 'Student'}
            </h2>
            <button 
              className="btn btn-secondary" 
              onClick={() => setRole(null)}
              style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem' }}
            >
              Back
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Name</label>
              <input type="text" name="name" className="form-input" required onChange={handleInputChange} />
            </div>
            
            <div className="form-group">
              <label className="form-label">Email</label>
              <input type="email" name="email" className="form-input" required onChange={handleInputChange} />
            </div>

            {role === 'teacher' && (
              <>
                <div className="form-group">
                  <label className="form-label">Institution</label>
                  <input type="text" name="institution" className="form-input" required onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label className="form-label">Department</label>
                  <input type="text" name="department" className="form-input" required onChange={handleInputChange} />
                </div>
                <div className="form-group mb-6">
                  <label className="form-label">Experience (Years)</label>
                  <input type="number" name="experience" className="form-input" min="0" required onChange={handleInputChange} />
                </div>
              </>
            )}

            {role === 'student' && (
              <>
                <div className="form-group">
                  <label className="form-label">College/University</label>
                  <input type="text" name="college" className="form-input" required onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label className="form-label">Course</label>
                  <input type="text" name="course" className="form-input" required onChange={handleInputChange} />
                </div>
                <div className="form-group mb-6">
                  <label className="form-label">Year of Study</label>
                  <select name="year" className="form-input" required onChange={handleInputChange}>
                    <option value="">Select Year...</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                  </select>
                </div>
              </>
            )}

            <button type="submit" className={role === 'teacher' ? 'btn btn-primary' : 'btn btn-accent'} style={{ width: '100%' }}>
              Submit Request
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default RequestAccess;
