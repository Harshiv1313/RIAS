import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/FacultyDashboard.css'; // Import CSS file for styling

const FacultyDashboard = () => {
  const [unapprovedUsers, setUnapprovedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token'); // Retrieve token from local storage

  useEffect(() => {
    // Fetch all unapproved faculty users on component mount
    const fetchUnapprovedUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/faculty/unapproved-users', {
          headers: {
            'Authorization': `Bearer ${token}` // Include token in headers
          }
        });
        setUnapprovedUsers(response.data);
      } catch (error) {
        setError('Error fetching unapproved users.');
        console.error('Error fetching unapproved users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUnapprovedUsers();
  }, [token]); // Add token as a dependency to re-fetch if it changes

  const handleApproveUser = async (userId) => {
    try {
      await axios.post(`http://localhost:5000/api/faculty/approve-user/${userId}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}` // Include token in headers
        }
      });

      // Optimistically update UI
      setUnapprovedUsers(unapprovedUsers.filter(user => user._id !== userId));
    } catch (error) {
      setError('Error approving user.');
      console.error('Error approving user:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Faculty Dashboard</h1>
      <h2>Unapproved Users</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      <table className="user-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {unapprovedUsers.map(user => (
            <tr key={user._id}>
              <td>{user.email}</td>
              <td>
                <button className="approve-button" onClick={() => handleApproveUser(user._id)}>Approve</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FacultyDashboard;
