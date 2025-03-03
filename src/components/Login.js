import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(`${API_URL}/token`, { username, password }, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      withCredentials: true  // Запрос с cookies
    });
    
    localStorage.setItem("token", response.data.access_token); // Сохраняем токен
    onLogin();
    navigate("/dashboard");
  } catch (err) {
    setError(err.response?.data?.detail || "Error logging in");
  }
};

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        {error && (
          <p className="text-red-500 mb-4 flex justify-between">
            {error}
            <button onClick={() => setError('')} className="text-blue-500">Clear</button>
          </p>
        )}
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Login
        </button>
      </form>
      <p className="mt-4 text-center">
        Don't have an account? <Link to="/register" className="text-blue-500">Register</Link>
      </p>
    </div>
  );
}

export default Login;
