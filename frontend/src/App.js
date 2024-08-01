import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import FacultyDashboard from './components/FacultyDashboard/FacultyDashboard';
import StudentMainContentPart1 from './components/Studentdashobard/StudentMainContentPart1'; // Update import path as needed
import Timetable from './components/Studentdashobard/Timetable'; // Ensure this import path is correct
import DashboardLayout from './components/Studentdashobard/DashboardLayout'; // Ensure this import path is correct
import DashboardLayoutf from './components/FacultyDashboard/DashboardLayout'; // Ensure this import path is correct
import StudentProfile from './components/Studentdashobard/StudentProfile';
import Users from './components/FacultyDashboard/user'
import './App.css'; // Ensure your CSS file is included

const AuthRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return !token ? children : <Navigate to="/student-dashboard" />;
};

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to={`/${role}-dashboard`} />;
  }

  return children;
};

function App() {
  useEffect(() => {
    const appContainer = document.querySelector('.app-container');
    if (appContainer) {
      appContainer.style.width = '80%';
      appContainer.style.height = '80%';
      appContainer.style.margin = '0 auto';
      appContainer.style.display = 'flex';
      appContainer.style.flexDirection = 'column';
      appContainer.style.position = 'relative';
      appContainer.style.top = '20px'; // Adjust as needed
    }
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/login" element={
            <AuthRoute>
              <Login />
            </AuthRoute>
          } />
          <Route path="/register" element={<Register />} />
          <Route path="/admin-dashboard" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <DashboardLayout>
                <AdminDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/faculty-dashboard" element={
            <ProtectedRoute allowedRoles={['faculty']}>
              <DashboardLayoutf>
                <Routes>
                  <Route path="" element={<FacultyDashboard />} />
                  <Route path="users" element={<Users />} />
                </Routes>
              </DashboardLayoutf>
            </ProtectedRoute>
          } />
          <Route path="/student-dashboard/*" element={
            <ProtectedRoute allowedRoles={['student']}>
              <DashboardLayout>
                <Routes>
                  <Route path="" element={<StudentMainContentPart1 />} />
                  <Route path="timetable" element={<Timetable />} />
                  <Route path="profile" element={<StudentProfile />} />
                </Routes>
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
