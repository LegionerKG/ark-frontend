import React from 'react';
import { Link } from 'react-router-dom';
import FileUpload from './FileUpload';

function Dashboard({ onLogout }) {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <button onClick={onLogout} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
          Logout
        </button>
      </div>
      <FileUpload />
      <Link to="/" className="block text-blue-500 mt-4">Back to Home</Link>
    </div>
  );
}

export default Dashboard;
