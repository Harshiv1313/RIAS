import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/FacultyPostTimetable.css'; // Import the updated CSS file

const FacultyPostTimetable = () => {
  // State for the timetable posting form
  const [semesters, setSemesters] = useState([]);
  const [branches, setBranches] = useState([]);
  const [batch, setBatch] = useState([]);
  const [sections, setSections] = useState([]);
  const [facultyName, setFacultyName] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [branch, setBranch] = useState('');
  const [section, setSection] = useState('');
  const [semester, setSemester] = useState('');
  const [day, setDay] = useState('');
  const [time, setTime] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  // State for the timetables
  const [timetables, setTimetables] = useState([]);
  const [filteredTimetables, setFilteredTimetables] = useState([]);
  const [error, setError] = useState('');

  // Fetch options for the form
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [semestersRes, branchesRes, sectionsRes] = await Promise.all([
            axios.get('http://localhost:4000/api/semesters'),
            axios.get('http://localhost:4000/api/branches'),
            axios.get('http://localhost:4000/api/sections')
        ]);

        setSemesters(semestersRes.data);
        setBranches(branchesRes.data);
        setSections(sectionsRes.data);
      } catch (error) {
        console.error('Error fetching options:', error);
        setMessage('Failed to load options.');
        setMessageType('error');
      }
    };

    fetchOptions();
  }, []);

  // Fetch timetables
  useEffect(() => {
    const fetchTimetables = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/timetables');
        setTimetables(response.data);
        setFilteredTimetables(response.data); // Initially display all timetables
      } catch (error) {
        console.error('Error fetching timetables:', error);
        setError('Failed to load timetables.');
      }
    };

    fetchTimetables();
  }, []);

  // Filter timetables based on selected criteria
  useEffect(() => {
    const filtered = timetables.filter(timetable => {
      return (
        (!semester || timetable.semester === semester) &&
        (!branch || timetable.branch === branch) &&
        (!section || timetable.section === section)
      );
    });
    setFilteredTimetables(filtered);
  }, [semester, branch, section, timetables]);

  // Handle timetable form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');

      await axios.post('http://localhost:4000/api/timetables', {
        facultyName,
        subjectName,
        courseCode,
        branch,
        section,
        semester,
        day,
        time,
        room,
        batch,
        createdBy: localStorage.getItem('userId') // Assuming you store the user ID in localStorage
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setMessage('Timetable posted successfully');
      setMessageType('success');
    } catch (error) {
      console.error('Error posting timetable:', error);
      setMessage('Failed to post timetable');
      setMessageType('error');
    }
  };

  return (
    <div className="faculty-post-timetable-container">
      <form onSubmit={handleSubmit} className="faculty-post-timetable-form">
        <div className="form-grid">
          <div className="form-item row1">
            <label>Faculty Name:</label>
            <input type="text" value={facultyName} onChange={(e) => setFacultyName(e.target.value)} required />
          </div>
          <div className="form-item row1">
            <label>Subject Name:</label>
            <input type="text" value={subjectName} onChange={(e) => setSubjectName(e.target.value)} required />
          </div>
          <div className="form-item row1">
            <label>Course Code:</label>
            <input type="text" value={courseCode} onChange={(e) => setCourseCode(e.target.value)} required />
          </div>
          <div className="form-item row1">
            <label>Branch:</label>
            <select value={branch} onChange={(e) => setBranch(e.target.value)} required>
              <option value="">Select Branch</option>
              {branches.map(branch => (
                <option key={branch} value={branch}>{branch}</option>
              ))}
            </select>
          </div>
          <div className="form-item row1">
            <label>Section:</label>
            <select value={section} onChange={(e) => setSection(e.target.value)} required>
              <option value="">Select Section</option>
              {sections.map(section => (
                <option key={section} value={section}>{section}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-grid">
          <div className="form-item row2">
            <label>Semester:</label>
            <select value={semester} onChange={(e) => setSemester(e.target.value)} required>
              <option value="">Select Semester</option>
              {semesters.map(sem => (
                <option key={sem} value={sem}>{sem}</option>
              ))}
            </select>
          </div>
          <div className="form-item row2">
            <label>Day:</label>
            <input type="text" value={day} onChange={(e) => setDay(e.target.value)} required />
          </div>
          <div className="form-item row2">
            <label>Time:</label>
            <input type="text" value={time} onChange={(e) => setTime(e.target.value)} required />
          </div>
          <div className="form-item row2">
            <label>Room:</label>
            <input type="text" value={room} onChange={(e) => setRoom(e.target.value)} required />
          </div>
          <div className="form-item row2">
            <label>Batch:</label>
            <input type="text" value={batch} onChange={(e) => setBatch(e.target.value)} required />
          </div>
          <div className="button-container">
            <button type="submit" className="submit-button">Post Timetable</button>
          </div>
        </div>
        {message && (
          <div className={`alert alert-${messageType}`}>
            {message}
          </div>
        )}
      </form>
      
      {/* Timetable Filter and Table Section */}
      <div className="timetable-container">
  <h2 className="timetable-title">Filtered Timetables</h2>
  {error && <div className="error-message">{error}</div>}

  <div className="filter-container">
    <div className="form-item">
      <label>Semester:</label>
      <select value={semester} onChange={(e) => setSemester(e.target.value)} className="select-dropdown">
        <option value="">Select Semester</option>
        {semesters.map(sem => (
          <option key={sem} value={sem}>{sem}</option>
        ))}
      </select>
    </div>

    <div className="form-item">
      <label>Branch:</label>
      <select value={branch} onChange={(e) => setBranch(e.target.value)} className="select-dropdown">
        <option value="">Select Branch</option>
        {branches.map(branch => (
          <option key={branch} value={branch}>{branch}</option>
        ))}
      </select>
    </div>

    <div className="form-item">
      <label>Section:</label>
      <select value={section} onChange={(e) => setSection(e.target.value)} className="select-dropdown">
        <option value="">Select Section</option>
        {sections.map(section => (
          <option key={section} value={section}>{section}</option>
        ))}
      </select>
    </div>


  </div>

  {filteredTimetables.length > 0 ? (
    <table className="timetable-table">
      <thead>
        <tr>
          <th>Branch</th>
          <th>Section</th>
          <th>Semester</th>
          <th>Batch</th> {/* Added Batch Column */}
          <th>Timetable</th>
          <th>Faculty Name</th>
          <th>Subject Name</th>
          <th>Course Code</th>
        </tr>
      </thead>
      <tbody>
        {filteredTimetables.map(timetable => (
          <tr key={timetable._id}>
            <td>{timetable.branch}</td>
            <td>{timetable.section}</td>
            <td>{timetable.semester}</td>
            <td>{timetable.batch}</td> {/* Added Batch Data */}
            <td>{timetable.timetable}</td>
            <td>{timetable.facultyName}</td>
            <td>{timetable.subjectName}</td>
            <td>{timetable.courseCode}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p>No timetables found for the selected criteria.</p>
  )}
</div>

    </div>
  );
};

export default FacultyPostTimetable;