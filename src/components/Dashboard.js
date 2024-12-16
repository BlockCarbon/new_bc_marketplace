import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [tokens, setTokens] = useState([]);
  const [totalMarketCap, setTotalMarketCap] = useState(0);
  const [averagePrice, setAveragePrice] = useState(0);

  useEffect(() => {
    const fetchTokenData = async () => {
      try {
        // Fetch token data from CoinGecko API
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 50,
            page: 1,
          },
        });

        const tokenData = response.data;
        setTokens(tokenData);

        // Calculate Total Market Cap
        const marketCapSum = tokenData.reduce((acc, token) => acc + token.market_cap, 0);
        setTotalMarketCap(marketCapSum);

        // Calculate Average Price
        const avgPrice =
          tokenData.reduce((acc, token) => acc + token.current_price, 0) / tokenData.length;
        setAveragePrice(avgPrice);
      } catch (error) {
        console.error('Error fetching token data:', error);
      }
    };

    fetchTokenData();
  }, []);

  // Prepare data for the top 10 tokens
  const topTokens = tokens.slice(0, 10);
  const chartData = {
    labels: topTokens.map(token => token.name),
    datasets: [
      {
        label: 'Market Cap (USD)',
        data: topTokens.map(token => token.market_cap),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Top 10 Tokens by Market Cap',
        font: { size: 18 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: value => `$${value.toLocaleString()}`,
        },
      },
      x: {
        ticks: { autoSkip: false, maxRotation: 45, minRotation: 45 },
      },
    },
  };

  return (
    <div className="dashboard-container">
      <h1>Marketplace Dashboard</h1>
      <div className="metric-card">
        <h2>Total Tokens Listed</h2>
        <p>{tokens.length}</p>
      </div>
      <div className="metric-card">
        <h2>Total Market Cap</h2>
        <p>${totalMarketCap.toLocaleString()}</p>
      </div>
      <div className="metric-card">
        <h2>Average Token Price</h2>
        <p>${averagePrice.toFixed(2)}</p>
      </div>

      {/* Top 10 Tokens Chart */}
      <div className="chart-container">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default Dashboard;
