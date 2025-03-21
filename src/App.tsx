import React, { useEffect } from 'react';
import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/styles.css';
import DoodleBackground from './components/DoodleBackground'; // Import the DoodleBackground component

// ProtectedRoute component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

// AdminRoute component
const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  return user?.role === 'Admin' ? children : <Navigate to="/dashboard" />;
};

const App: React.FC = () => {
  // Dynamically set the page title
  useEffect(() => {
    document.title = "PTS Data Purchase App"; // Change the title here
  }, []);

  const currentYear = new Date().getFullYear(); // Get the current year

  return (
    <AuthProvider>
      <Router>
        <DoodleBackground />
        <div className="main-container">
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/settings" element={<AdminRoute><Settings /></AdminRoute>} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
          <ToastContainer />
        </div>
        
        {/* Footer */}
        <footer className="footer">
          <p className="footer-text">© {currentYear} PLAW's Telecom Services. All Rights Reserved.</p>
        </footer>
      </Router>
    </AuthProvider>
  );
};

export default App;
