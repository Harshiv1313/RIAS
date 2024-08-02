import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/user.css'; // Import CSS file for styling

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token'); // Retrieve token from local storage

  useEffect(() => {
    // Fetch all users on component mount
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users', {
          headers: {
            'Authorization': `Bearer ${token}` // Include token in headers
          }
        });
        setUsers(response.data);
      } catch (error) {
        setError('Error fetching users.');
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]); // Add token as a dependency to re-fetch if it changes

  const handleApproveUser = async (userId) => {
    try {
      await axios.post(`http://localhost:5000/api/faculty/approve-user/${userId}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}` // Include token in headers
        }
      });

      // Optimistically update UI
      setUsers(users.map(user => user._id === userId ? { ...user, isApproved: true } : user));
    } catch (error) {
      setError('Error approving user.');
      console.error('Error approving user:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <div className='heading'><h1>Faculty Dashboard</h1></div>
      <h2>Users</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      <table className="user-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Approved</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.isApproved ? 'Yes' : 'No'}</td>
              <td>
                {!user.isApproved && (
                  <button className="approve-button" onClick={() => handleApproveUser(user._id)}>Approve</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
