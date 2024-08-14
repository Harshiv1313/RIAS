import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/user.css'; // Import CSS file for styling

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const token = localStorage.getItem('token'); // Retrieve token from local storage

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/users', {
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
      await axios.post(`http://localhost:4000/api/faculty/approve-user/${userId}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}` // Include token in headers
        }
      });

      setUsers(users.map(user => user._id === userId ? { ...user, isApproved: true } : user));
    } catch (error) {
      setError('Error approving user.');
      console.error('Error approving user:', error);
    }
  };

  const handleRejectUser = async (userId) => {
    try {
      await axios.post(`http://localhost:4000/api/faculty/reject-user/${userId}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}` // Include token in headers
        }
      });

      setUsers(users.map(user => user._id === userId ? { ...user, isApproved: false } : user));
    } catch (error) {
      setError('Error rejecting user.');
      console.error('Error rejecting user:', error);
    }
  };

  const handleBulkApprove = async () => {
    try {
      await Promise.all(selectedUsers.map(userId => 
        axios.post(`http://localhost:4000/api/faculty/approve-user/${userId}`, {}, {
          headers: {
            'Authorization': `Bearer ${token}` // Include token in headers
          }
        })
      ));

      setUsers(users.map(user => selectedUsers.includes(user._id) ? { ...user, isApproved: true } : user));
      setSelectedUsers([]);
    } catch (error) {
      setError('Error approving users.');
      console.error('Error approving users:', error);
    }
  };

  const handleSelectUser = (userId) => {
    setSelectedUsers(prevState =>
      prevState.includes(userId)
        ? prevState.filter(id => id !== userId)
        : [...prevState, userId]
    );
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const approvedUsers = filteredUsers.filter(user => user.isApproved);
  const notApprovedUsers = filteredUsers.filter(user => !user.isApproved);

  return (
    <div className="userdashboard-container">
      <input
        type="text"
        className="userdashboard-search-bar"
        placeholder="Search by username or email..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      {loading && <p>Loading...</p>}
      {error && <p className="userdashboard-error-message">{error}</p>}
      

      <div className="userdashboard-table-wrapper">
        <div className="userdashboard-table-container">
          <h3 className="userdashboard-heading">Not Approved Users</h3>
          
          <table className="userdashboard-table">
            <thead>
              <tr>
                <th>Select</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Approved</th>
                <th>Action</th>
              </tr>
              
            </thead>
            <tbody>
              {notApprovedUsers.map(user => (
                <tr key={user._id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user._id)}
                      onChange={() => handleSelectUser(user._id)}
                    />
                  </td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.isApproved ? 'Yes' : 'No'}</td>
                  <td>
                    {!user.isApproved && (
                      <button className="userdashboard-approve-button" onClick={() => handleApproveUser(user._id)}>Approve</button>
                    )}
                  </td>
                </tr>
                
              ))}
              <button className="userdashboard-select-button" onClick={handleBulkApprove}>Approve Selected</button>
            </tbody>
            
          </table>
        </div>

        <div className="userdashboard-table-container">
          <h3 className="userdashboard-heading">Approved Users</h3>
          <table className="userdashboard-table">
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
              {approvedUsers.map(user => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.isApproved ? 'Yes' : 'No'}</td>
                  <td>
                    {user.isApproved && (
                      <button className="userdashboard-reject-button" onClick={() => handleRejectUser(user._id)}>Reject</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
