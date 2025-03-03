import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Landing from './components/Landing';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

useEffect(() => {
  const checkAuth = async () => {
    try {
      await axios.get(`${API_URL}/health`, { withCredentials: true });
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Failed to check auth:', error);
      setIsAuthenticated(false);
    }
  };
  checkAuth();
}, [API_URL]);

  
  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => {
    axios.post(`${API_URL}/logout`, {}, { withCredentials: true })
      .then(() => setIsAuthenticated(false));
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Landing isAuthenticated={isAuthenticated} onLogout={handleLogout} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
