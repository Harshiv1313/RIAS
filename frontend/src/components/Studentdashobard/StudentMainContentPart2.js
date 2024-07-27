import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CSS/StudentMainContentPart2.css'; // Ensure this path is correct

const StudentMainContentPart2 = () => {
  const [value, setValue] = useState(new Date());

  const handleDateChange = (date) => {
    setValue(date);
  };

  return (
    <div className="student-main-content-part2">
      <Calendar onChange={handleDateChange} value={value} />
    </div>
  );
};

export default StudentMainContentPart2;
