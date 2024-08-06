import React, { useState, useEffect } from "react";
import StudentImage from "../../assets/faculty.png";
import "./CSS/StudentProfile.css";

const StudentProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [error, setError] = useState(null);

  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      // Extract user ID from the token
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const userId = decodedToken.id;

      const response = await fetch(
        `http://localhost:4000/api/users/user/${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setProfileData({
          ...data,
          // Fake additional data
          role: "student",
          profilePicture: "http://example.com/path/to/profile-picture.jpg",
          rollNumber: "123456789",
          course: "Computer Science",
          year: "3",
          semester: "6",
          major: "Software Engineering",
          gpa: "8.5",
          dateOfBirth: "2002-01-15",
          gender: "Male",
          address: "123, Elm Street, City, Country",
          emergencyContact: {
            name: "Jane Doe",
            number: "+91-987-654-3210",
          },
        });
        setFormData({
          name: data.username || "",
          email: data.email || "",
        });
      } else if (response.status === 404) {
        setError("Profile not found.");
      } else {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
      setError("Error fetching profile data. Please try again later.");
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const userId = decodedToken.id;

      const response = await fetch(
        `http://localhost:4000/api/users/user/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setProfileData(data);
        setIsEditing(false);
      } else if (response.status === 404) {
        setError("Profile not found.");
      } else {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Error updating profile. Please try again later.");
    }
  };

  return (
    <div className="profile-container">
      {error && <div className="error">{error}</div>}
      <h2>Student Profile</h2>
      <div className="profile-boxes">
        <div className="profile-square">
          <div>
            <strong>Profile Picture:</strong>
            <img src={StudentImage} alt="Profile" className="profile-picture" />
          </div>

          <div>
            <strong>Name: Aditya Bhagat</strong>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            ) : (
              <span>{profileData ? profileData.username : "Loading..."}</span>
            )}
          </div>

          <div>
            <strong>Roll Number: 41</strong>{" "}
            {profileData ? profileData.rollNumber : "Loading..."}
          </div>
          <div className="profile-detail">
            <strong>Course:</strong>
            <span className="profile-data">
              {profileData ? profileData.course : "Loading..."}
            </span>
          </div>

          <div>
            <strong>Email:</strong>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            ) : (
              <span>{profileData ? profileData.email : "Loading..."}</span>
            )}
          </div>
          <div>
            {isEditing ? (
              <button onClick={handleSave}>Save</button>
            ) : (
              <button onClick={() => setIsEditing(true)}>Edit</button>
            )}
          </div>
        </div>

        <div className="profile-square">
          <div>
            <strong>Year:2021-2025</strong>
          </div>
          <div>
            <strong>Semester:VII</strong>
          </div>
          <div>
            <strong>Major: CSE</strong>
          </div>
          <div>
            <strong>GPA:</strong>
          </div>
          <div>
            <strong>Date of Birth:03/11/2002</strong>
          </div>
          <div>
            <strong>Gender:MALE</strong>
          </div>
          <div>
            <strong>Address:NAGPUR</strong>
          </div>
          <div>
            <strong>Emergency Contact:7219019359 </strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
