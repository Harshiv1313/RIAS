// src/components/Student/SurveyDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SurveyDashboard = () => {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    axios.get('/api/surveys').then(response => setSurveys(response.data));
  }, []);

  return (
    <div>
      <h1>Available Surveys</h1>
      {surveys.map(survey => (
        <div key={survey._id}>
          <h2>{survey.title}</h2>
          <button onClick={() => window.location.href = `/survey/${survey._id}`}>Take Survey</button>
        </div>
      ))}
    </div>
  );
};

export default SurveyDashboard;
