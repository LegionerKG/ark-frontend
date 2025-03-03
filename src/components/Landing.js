import React from 'react';
import { Link } from 'react-router-dom';

function Landing({ isAuthenticated, onLogout }) {
  return (
    <div className="text-center p-6">
      <h1 className="text-5xl font-bold text-blue-600 mb-4">ARK Analytics</h1>
      <p className="text-xl mb-6 max-w-2xl mx-auto">
        Transform your business data into actionable insights with ARK. Upload your files, visualize trends, get AI-driven advice, and forecast growth effortlessly.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-6">
        <div className="p-4 bg-white rounded shadow">
          <h3 className="text-lg font-semibold">Data Visualization</h3>
          <p>Interactive charts for revenue and expenses.</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h3 className="text-lg font-semibold">AI Insights</h3>
          <p>Personalized business recommendations.</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h3 className="text-lg font-semibold">Forecasting</h3>
          <p>Predict future trends with ML.</p>
        </div>
      </div>
      {!isAuthenticated ? (
        <div>
          <Link to="/register" className="inline-block px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 mr-4">
            Get Started
          </Link>
          <Link to="/login" className="inline-block px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600">
            Login
          </Link>
        </div>
      ) : (
        <div>
          <Link to="/dashboard" className="inline-block px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 mr-4">
            Dashboard
          </Link>
          <button onClick={onLogout} className="inline-block px-6 py-3 bg-red-500 text-white rounded hover:bg-red-600">
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Landing;
