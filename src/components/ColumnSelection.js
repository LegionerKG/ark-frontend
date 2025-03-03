import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { ClipLoader } from 'react-spinners';

function ColumnSelection({ columns, fileToken, onAnalysisComplete, setError, setLoading }) {
  const [dateCol, setDateCol] = useState(null);
  const [revenueCol, setRevenueCol] = useState(null);
  const [expensesCol, setExpensesCol] = useState(null);
  const [useAuto, setUseAuto] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  const options = columns.map(col => ({ value: col, label: col }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const formData = new FormData();
    formData.append('file_token', fileToken);
    if (!useAuto) {
      formData.append('date_col', dateCol?.value);
      formData.append('revenue_col', revenueCol?.value);
      formData.append('expenses_col', expensesCol?.value);
    }
    formData.append('auto', useAuto);

    try {
      const response = await axios.post(`${API_URL}/analyze`, formData, { withCredentials: true });
      onAnalysisComplete(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Error analyzing file');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h4 className="text-lg font-semibold mb-2">Select Columns</h4>
      <form onSubmit={handleSubmit}>
        {!useAuto && (
          <>
            <div className="mb-4">
              <label className="block mb-1">Date Column</label>
              <Select
                options={options}
                value={dateCol}
                onChange={setDateCol}
                placeholder="Select date column"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Revenue Column</label>
              <Select
                options={options}
                value={revenueCol}
                onChange={setRevenueCol}
                placeholder="Select revenue column"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Expenses Column</label>
              <Select
                options={options}
                value={expensesCol}
                onChange={setExpensesCol}
                placeholder="Select expenses column"
              />
            </div>
          </>
        )}
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={useAuto}
              onChange={(e) => setUseAuto(e.target.checked)}
              className="mr-2"
            />
            Use Automatic Interpretation
          </label>
        </div>
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Analyze
        </button>
      </form>
    </div>
  );
}

export default ColumnSelection;
