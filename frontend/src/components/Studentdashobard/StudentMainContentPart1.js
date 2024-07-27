import React from 'react';
import './CSS/StudentMainContentPart1.css'; // Ensure this path is correct

const StudentMainContentPart1 = () => {
  return (
    <div className="student-main-content-part1">
      <div className="card-container">
        <div className="card">
          <h2>Upcoming Classes</h2>
          <p>Check your upcoming classes and timetable here.</p>
        </div>
        <div className="card">
          <h2>Daily Feedback</h2>
          <p>Submit your daily feedback on today's lecture.</p>
        </div>
        <div className="card">
          <h2>Weekly Feedback</h2>
          <p>Review and submit feedback for this week's lectures.</p>
        </div>
        <div className="card">
          <h2>Monthly Survey</h2>
          <p>Participate in the monthly survey on teaching methodologies and campus issues.</p>
        </div>
      </div>
    </div>
  );
};

export default StudentMainContentPart1;
