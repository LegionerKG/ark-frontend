import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from "react-router-dom";
import axios from "axios";
import Landing from "./components/Landing";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(`${API_URL}/health`, { withCredentials: true });
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, [API_URL]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Навигация */}
        <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-blue-600">ARK Analytics</Link>
          <div>
            {isAuthenticated ? (
              <Link to="/dashboard" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Dashboard</Link>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mr-2">Login</Link>
                <Link to="/register" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Sign Up</Link>
              </>
            )}
          </div>
        </nav>

        {/* Основной контент */}
        <div className="container mx-auto p-6">
          <Routes>
            <Route path="/" element={<Landing isAuthenticated={isAuthenticated} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
            <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;