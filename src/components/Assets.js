import React, { useEffect, useState } from 'react';
import { useWallet } from '../context/WalletContext'; // Wallet context for wallet address
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import './Assets.css';

const Assets = () => {
  const { walletAddress } = useWallet();
  const [assets, setAssets] = useState([]);
  const [totalPortfolioValue, setTotalPortfolioValue] = useState(0);

  // 🔥 Function to fetch the user's assets
  const fetchAssets = async () => {
    if (!walletAddress) return;
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: 50,
          page: 1,
        },
      });

      // Simulated user's holdings for demonstration purposes
      const userHoldings = [
        { id: 'bitcoin', symbol: 'btc', balance: 0.5 },
        { id: 'ethereum', symbol: 'eth', balance: 2 },
        { id: 'cardano', symbol: 'ada', balance: 500 },
      ];

      const userAssets = response.data.map(token => {
        const userToken = userHoldings.find(holding => holding.id === token.id);
        if (userToken) {
          return {
            ...token,
            balance: userToken.balance,
            totalValue: userToken.balance * token.current_price,
          };
        }
        return null;
      }).filter(Boolean); // Remove null values

      setAssets(userAssets);

      const totalValue = userAssets.reduce((acc, token) => acc + token.totalValue, 0);
      setTotalPortfolioValue(totalValue);
    } catch (error) {
      console.error('Error fetching assets:', error);
    }
  };

  useEffect(() => {
    if (walletAddress) fetchAssets();
  }, [walletAddress]);

  const chartData = {
    labels: assets.map(asset => asset.name),
    datasets: [
      {
        label: 'Portfolio Distribution',
        data: assets.map(asset => asset.totalValue),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 15,
          font: {
            size: 12,
          },
        },
      },
    },
  };

  if (!walletAddress) {
    return (
      <div className="assets-container">
        <h2>Please connect your wallet to see your assets.</h2>
      </div>
    );
  }

  return (
    <div className="assets-container">
      <h2 className="assets-header">Your Portfolio</h2>

      {/* Portfolio Overview Section */}
      <section className="portfolio-overview">
        <div className="info-card">
          <h3>Total Portfolio Value</h3>
          <p>${totalPortfolioValue.toLocaleString()}</p>
        </div>
        <div className="info-card">
          <h3>Total Tokens Held</h3>
          <p>{assets.length}</p>
        </div>
      </section>

      {/* Portfolio Distribution Chart */}
      <section className="portfolio-distribution">
        <h3>Portfolio Distribution</h3>
        <Pie data={chartData} options={chartOptions} />
      </section>

      {/* List of Tokens */}
      <section className="asset-list">
        <h3>Your Assets</h3>
        <table className="asset-table">
          <thead>
            <tr>
              <th>Token</th>
              <th>Symbol</th>
              <th>Balance</th>
              <th>Current Price</th>
              <th>Total Value</th>
            </tr>
          </thead>
          <tbody>
            {assets.map(asset => (
              <tr key={asset.id}>
                <td>{asset.name}</td>
                <td>{asset.symbol.toUpperCase()}</td>
                <td>{asset.balance}</td>
                <td>${asset.current_price.toFixed(2)}</td>
                <td>${asset.totalValue.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Assets;
