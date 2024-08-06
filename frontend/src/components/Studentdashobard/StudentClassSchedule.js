import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentClassSchedule = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/class-schedules');
        // Ensure response data is in the correct format
        if (Array.isArray(response.data.schedules)) {
          // Reverse the array to get the last schedules first
          const reversedSchedules = response.data.schedules.reverse();
          setData(reversedSchedules);
        } else {
          console.error('Unexpected data format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching schedules:', error);
      }
    };

    // Fetch schedules immediately on component mount
    fetchSchedules();

    // Set up an interval to fetch schedules every 2 seconds
    const intervalId = setInterval(fetchSchedules, 2000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  // Get the last 3 schedules (from the reversed list)
  const lastThreeSchedules = data.slice(0, 3);

  // Create a placeholder row if fewer than 3 schedules are available
  const rows = lastThreeSchedules.length < 3 ? [...lastThreeSchedules, ...Array(3 - lastThreeSchedules.length).fill(null)] : lastThreeSchedules;

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Faculty Name</th>
            <th>Day of Week</th>
            <th>Start Time</th>
            <th>End Time</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((schedule, index) => (
            <tr key={index}>
              <td>{schedule ? schedule.courseName : 'N/A'}</td>
              <td>{schedule ? schedule.facultyName : 'N/A'}</td>
              <td>{schedule ? schedule.dayOfWeek : 'N/A'}</td>
              <td>{schedule ? schedule.startTime : 'N/A'}</td>
              <td>{schedule ? schedule.endTime : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentClassSchedule;
