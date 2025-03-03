import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Landing from './components/Landing';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null — начальное состояние
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  // Проверка авторизации при загрузке
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${API_URL}/health`, { 
          withCredentials: true // Отправляем cookie
        });
        setIsAuthenticated(response.status === 200);
      } catch (error) {
        console.error('Auth check failed:', error.response?.status || error.message);
        setIsAuthenticated(false); // Неавторизован при ошибке
      }
    };
    checkAuth();
  }, [API_URL]);

  // Обработчик логина
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // Обработчик разлогина
  const handleLogout = async () => {
    try {
      await axios.post(`${API_URL}/logout`, {}, { 
        withCredentials: true // Очищаем cookie на backend
      });
      setIsAuthenticated(false);
      window.location.href = '/'; // Перенаправляем на главную
    } catch (error) {
      console.error('Logout failed:', error.response?.status || error.message);
      setIsAuthenticated(false); // Принудительный сброс состояния
    }
  };

  // Пока проверяем авторизацию, показываем загрузку
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route 
            path="/" 
            element={<Landing isAuthenticated={isAuthenticated} onLogout={handleLogout} />} 
          />
          <Route 
            path="/register" 
            element={<Register />} 
          />
          <Route 
            path="/login" 
            element={<Login onLogin={handleLogin} />} 
          />
          <Route 
            path="/dashboard" 
            element={
              isAuthenticated ? (
                <Dashboard onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
