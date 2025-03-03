import React, { useState } from 'react';
import axios from 'axios';
import ColumnSelection from './ColumnSelection';
import Analysis from './Analysis';
import { ClipLoader } from 'react-spinners';

function FileUpload() {
  const [file, setFile] = useState(null);
  const [columns, setColumns] = useState(null);
  const [fileToken, setFileToken] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setError('');
    setColumns(null);
    setAnalysisData(null);
    setLoading(true);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post(`${API_URL}/upload`, formData, { withCredentials: true });
      setColumns(response.data.columns);
      setFileToken(response.data.file_token);
    } catch (err) {
      setError(err.response?.data?.detail || 'Error uploading file');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Upload Your Data</h3>
      <input
        type="file"
        accept=".csv, .xlsx"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-500 file:text-white mb-4"
      />
      {loading && <div className="text-center"><ClipLoader color="#3b82f6" /></div>}
      {error && (
        <p className="text-red-500 mb-4 flex justify-between">
          {error}
          <button onClick={() => setError('')} className="text-blue-500">Clear</button>
        </p>
      )}
      {columns && !analysisData && (
        <ColumnSelection
          columns={columns}
          fileToken={fileToken}
          onAnalysisComplete={(data) => setAnalysisData(data)}
          setError={setError}
          setLoading={setLoading}
        />
      )}
      {analysisData && (
        <Analysis
          data={analysisData}
          fileToken={fileToken}
          onBack={() => setAnalysisData(null)}
        />
      )}
    </div>
  );
}

export default FileUpload;
