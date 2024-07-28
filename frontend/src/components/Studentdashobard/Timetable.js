import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Timetable = () => {
  const [timetable, setTimetable] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from local storage

        if (!token) {
          throw new Error('No authentication token found');
        }

        // Fetch class schedules
        const response = await axios.get('http://localhost:5000/api/class-schedules', {
          headers: {
            Authorization: `Bearer ${token}` // Ensure token is sent with this request
          }
        });

        if (response.data && response.data.schedules) {
          setTimetable(response.data.schedules);
        } else {
          throw new Error('Class schedules are not available');
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching schedules:', error.response?.data || error.message);
        setError('Failed to load data. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchTimetable();

    // Set up an interval to fetch class schedules every second
    const intervalId = setInterval(async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from local storage

        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await axios.get('http://localhost:5000/api/class-schedules', {
          headers: {
            Authorization: `Bearer ${token}` // Ensure token is sent with this request
          }
        });

        if (response.data && response.data.schedules) {
          setTimetable(response.data.schedules);
        }
      } catch (error) {
        console.error('Error fetching schedules:', error.response?.data || error.message);
      }
    }, 1000); // Adjust interval to 1 second

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    margin: '20px 0',
    fontSize: '18px',
    textAlign: 'left',
    border: '1px solid #ddd',
  };

  const thStyle = {
    backgroundColor: '#f4f4f4',
    color: '#333',
    padding: '12px 15px',
    borderBottom: '2px solid #ddd',
  };

  const tdStyle = {
    padding: '12px 15px',
    borderBottom: '1px solid #ddd',
  };

  const errorStyle = {
    color: 'red',
    fontWeight: 'bold',
  };

  const headerStyle = {
    fontSize: '24px',
    margin: '20px 0',
    color: '#333',
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2 style={headerStyle}>Timetable</h2>
      {error && <p style={errorStyle}>{error}</p>} {/* Display error message if any */}

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Course Name</th>
            <th style={thStyle}>Faculty Name</th>
            <th style={thStyle}>Day of Week</th>
            <th style={thStyle}>Start Time</th>
            <th style={thStyle}>End Time</th>
          </tr>
        </thead>
        <tbody>
          {timetable.length > 0 ? timetable.map((schedule, index) => (
            <tr key={index}>
              <td style={tdStyle}>{schedule.courseName}</td>
              <td style={tdStyle}>{schedule.facultyName}</td>
              <td style={tdStyle}>{schedule.dayOfWeek}</td>
              <td style={tdStyle}>{schedule.startTime}</td>
              <td style={tdStyle}>{schedule.endTime}</td>
            </tr>
          )) : (
            <tr>
              <td colSpan="5" style={tdStyle}>No timetable available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Timetable;
