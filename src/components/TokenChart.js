import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const TokenChart = ({ tokens }) => {
  // Prepare chart data
  const data = {
    labels: tokens.map((token) => token.name),
    datasets: [
      {
        label: 'Market Cap (USD)',
        data: tokens.map((token) => token.market_cap),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto' }}>
      <h3>Market Cap Distribution</h3>
      <Pie data={data} />
    </div>
  );
};

export default TokenChart;
