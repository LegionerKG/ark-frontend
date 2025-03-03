import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import axios from 'axios';

function Analysis({ data, fileToken, onBack }) {
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  const forecastData = {
    labels: data.forecast.dates,
    datasets: [
      {
        label: 'Revenue Forecast',
        data: data.forecast.values,
        borderColor: 'blue',
        fill: false,
      },
    ],
  };

  const handleDownloadPDF = async () => {
    const formData = new FormData();
    formData.append('file_token', fileToken);
    try {
      const response = await axios.post(`${API_URL}/export-pdf`, formData, {
        withCredentials: true,
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'ark_report.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error('Error downloading PDF:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded shadow">
          <h4 className="text-lg font-semibold">Total Revenue</h4>
          <p>{data.metrics.total_revenue.toLocaleString()} ₽</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h4 className="text-lg font-semibold">Profit</h4>
          <p>{data.metrics.profit.toLocaleString()} ₽</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h4 className="text-lg font-semibold">Profit Margin</h4>
          <p>{data.metrics.profit_margin.toFixed(2)}%</p>
        </div>
      </div>
      <div className="p-4 bg-white rounded shadow">
        <h4 className="text-lg font-semibold mb-2">Revenue and Expenses</h4>
        <img src={data.chart} alt="Chart" className="max-w-full h-auto" />
      </div>
      <div className="p-4 bg-white rounded shadow">
        <h4 className="text-lg font-semibold mb-2">Revenue Forecast</h4>
        <Line data={forecastData} />
      </div>
      <div className="p-4 bg-white rounded shadow">
        <h4 className="text-lg font-semibold mb-2">AI Advice</h4>
        <p>{data.ai_advice}</p>
        <p className="text-sm text-gray-600 mt-2">Market Trend: {data.market_trend.toFixed(2)}</p>
      </div>
      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Back to Selection
        </button>
        <button
          onClick={handleDownloadPDF}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Download PDF Report
        </button>
      </div>
    </div>
  );
}

export default Analysis;
