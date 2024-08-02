import React, { useState } from 'react';
import axios from 'axios';

const SurveyForm = () => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{ questionText: '', options: [] }]);

  const handleQuestionChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index][event.target.name] = event.target.value;
    setQuestions(newQuestions);
  };

  const handleAddOption = (index) => {
    const newQuestions = [...questions];
    newQuestions[index].options.push('');
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/surveys/create', { title, questions });
      alert('Survey created successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to create survey');
    }
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    maxWidth: '600px',
    margin: '200px auto 0', // Added top margin of 20px
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
    
  };

  const inputStyle = {
    margin: '10px 0',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '100%',
    maxWidth: '500px'
  };

  const buttonStyle = {
    margin: '10px 0',
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer'
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <input 
        type="text" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        placeholder="Survey Title" 
        required 
        style={inputStyle}
      />
      {questions.map((question, index) => (
        <div key={index}>
          <input 
            type="text" 
            name="questionText" 
            value={question.questionText} 
            onChange={(e) => handleQuestionChange(index, e)} 
            placeholder="Question" 
            required 
            style={inputStyle}
          />
          {question.options.map((option, i) => (
            <input 
              key={i} 
              type="text" 
              value={option} 
              onChange={(e) => {
                const newQuestions = [...questions];
                newQuestions[index].options[i] = e.target.value;
                setQuestions(newQuestions);
              }} 
              placeholder="Option" 
              required 
              style={inputStyle}
            />
          ))}
          <button 
            type="button" 
            onClick={() => handleAddOption(index)} 
            style={buttonStyle}
          >
            Add Option
          </button>
        </div>
      ))}
      <button 
        type="submit" 
        style={buttonStyle}
      >
        Create Survey
      </button>
    </form>
  );
};

export default SurveyForm;
