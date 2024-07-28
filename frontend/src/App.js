import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './components/AdminDashboard';
import FacultyDashboard from './components/FacultyDashboard';
import StudentDashboard from './components/Studentdashobard/StudentDashboard';
import './App.css'; // Ensure your CSS file is included

const AuthRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? <Navigate to="/student-dashboard" /> : children;
};

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    // Redirect to a role-specific dashboard or login if not authorized
    switch (role) {
      case 'admin':
        return <Navigate to="/admin-dashboard" />;
      case 'faculty':
        return <Navigate to="/faculty-dashboard" />;
      case 'student':
        return <Navigate to="/student-dashboard" />;
      default:
        return <Navigate to="/login" />;
    }
  }

  return children;
};

function App() {
  useEffect(() => {
    // Adjust the app container size to 80% of the viewport
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
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/faculty-dashboard" element={
            <ProtectedRoute allowedRoles={['faculty']}>
              <FacultyDashboard />
            </ProtectedRoute>
          } />
          <Route path="/student-dashboard" element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentDashboard />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
