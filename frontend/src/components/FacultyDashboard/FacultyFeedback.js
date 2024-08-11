import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/FacultyFeedback.css";

const FacultyFeedback = () => {
  const [semesters, setSemesters] = useState([]);
  const [branches, setBranches] = useState([]);
  const [sections, setSections] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [courses, setCourses] = useState([]);
  const [faculties, setFaculties] = useState([]);
  
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState('');
  
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [semestersRes, branchesRes, sectionsRes, subjectsRes, coursesRes] = await Promise.all([
          axios.get("http://localhost:4000/api/feedback/feedbacks/semesters"),
          axios.get("http://localhost:4000/api/feedback/feedbacks/branches"),
          axios.get("http://localhost:4000/api/feedback/feedbacks/sections"),
          axios.get("http://localhost:4000/api/feedback/feedbacks/subject-names"),
          axios.get("http://localhost:4000/api/feedback/feedbacks/course-names"),
          axios.get(" http://localhost:4000/api/feedback/feedbacks/faculty-names"),
        ]);

        setSemesters(semestersRes.data);
        setBranches(branchesRes.data);
        setSections(sectionsRes.data);
        setSubjects(subjectsRes.data);
        setCourses(coursesRes.data);
      } catch (error) {
        console.error("Error fetching options:", error);
        setMessage("Failed to load options.");
        setMessageType("error");
      }
    };

    fetchOptions();
  }, []);

  useEffect(() => {
    const fetchFaculties = async () => {
      if (selectedSemester && selectedBranch && selectedSection) {
        try {
          const response = await axios.get("http://localhost:4000/api/feedback/feedbacks/faculty-names", {
            params: {
              semester: selectedSemester,
              branch: selectedBranch,
              section: selectedSection,
              subjectName: selectedSubject,
              courseName: selectedCourse,
            }
          });
          setFaculties(response.data);
        } catch (error) {
          console.error("Error fetching faculty names:", error);
          setMessage("Failed to load faculty names.");
          setMessageType("error");
        }
      }
    };

    fetchFaculties();
  }, [selectedSemester, selectedBranch, selectedSection, selectedSubject, selectedCourse]);

  return (
    <div className="feedback-container">
      <div className="feedback-card faculty-feedback">
        <h2>Faculty Feedback</h2>
        <p>Here you can review feedback provided by faculty about the students and overall classroom performance.</p>
        {message && (
          <div className={`message ${messageType}`}>
            {message}
          </div>
        )}
        <div className="dropdown-container">
          <div className="dropdown-item">
            <label htmlFor="semester">Semester:</label>
            <select
              id="semester"
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
            >
              <option value="">Select Semester</option>
              {semesters.map((semester, index) => (
                <option key={index} value={semester}>
                  {semester}
                </option>
              ))}
            </select>
          </div>
          <div className="dropdown-item">
            <label htmlFor="branch">Branch:</label>
            <select
              id="branch"
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
            >
              <option value="">Select Branch</option>
              {branches.map((branch, index) => (
                <option key={index} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
          </div>
          <div className="dropdown-item">
            <label htmlFor="section">Section:</label>
            <select
              id="section"
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
            >
              <option value="">Select Section</option>
              {sections.map((section, index) => (
                <option key={index} value={section}>
                  {section}
                </option>
              ))}
            </select>
          </div>
          <div className="dropdown-item">
            <label htmlFor="subject">Subject:</label>
            <select
              id="subject"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              <option value="">Select Subject</option>
              {subjects.map((subject, index) => (
                <option key={index} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>
          <div className="dropdown-item">
            <label htmlFor="course">Course:</label>
            <select
              id="course"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              <option value="">Select Course</option>
              {courses.map((course, index) => (
                <option key={index} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default FacultyFeedback;
