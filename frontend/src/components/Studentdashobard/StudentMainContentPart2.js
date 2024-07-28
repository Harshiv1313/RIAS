import React from 'react';
import './CSS/StudentMainContentPart1.css'; // Ensure this path is correct

const StudentMainContentPart2 = () => {
  const today = new Date();
  const dateString = today.toLocaleDateString();
  const timeString = today.toLocaleTimeString();

  return (
    <div className="student-main-content-part2">
      <div className="date-time">
        <h2>Date: {dateString}</h2>
        <h3>Time: {timeString}</h3>
      </div>
      <div className="timetable-card">
        <h2>Today's Upcoming Classes</h2>
        <div className="scrollable-timetable">
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Subject</th>
                <th>Professor</th>
              </tr>
            </thead>
            <tbody>
              {/* Example data */}
              <tr>
                <td>9:00 AM</td>
                <td>Mathematics</td>
                <td>Dr. Smith</td>
              </tr>
              <tr>
                <td>11:00 AM</td>
                <td>Physics</td>
                <td>Dr. Johnson</td>
              </tr>
              <tr>
                <td>2:00 PM</td>
                <td>Chemistry</td>
                <td>Dr. Brown</td>
              </tr>
              <tr>
                <td>4:00 PM</td>
                <td>Biology</td>
                <td>Dr. Davis</td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
        <button className="view-all-button">View Full Timetable</button>
      </div>
    </div>
  );
};

export default StudentMainContentPart2;
