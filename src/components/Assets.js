import React, { useEffect, useState } from 'react';
import { useWallet } from '../context/WalletContext'; // Wallet context for wallet address and token list
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import './Assets.css';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const Assets = () => {
  const { walletAddress, tokenList } = useWallet();
  const [assets, setAssets] = useState([]);
  const [totalPortfolioValue, setTotalPortfolioValue] = useState(0);
  const [isExampleData, setIsExampleData] = useState(false);

  // Example data for fallback
  const exampleAssets = [
    { assetName: 'Sample ADA', policyId: 'N/A', quantity: 1_000_000_000 },
    { assetName: 'Sample Token A', policyId: '00000000000000000000000000000000000000000000000000000001', quantity: 500_000_000 },
    { assetName: 'Sample Token B', policyId: '00000000000000000000000000000000000000000000000000000002', quantity: 250_000_000 },
  ];

  useEffect(() => {
    if (walletAddress && tokenList.length > 0) {
      // Use wallet data if available
      setAssets(tokenList);
      const totalValue = tokenList.reduce((acc, token) => acc + token.quantity, 0);
      setTotalPortfolioValue(totalValue / 1_000_000); // Convert to ADA
      setIsExampleData(false);
    } else {
      // Use example data if wallet data is unavailable
      setAssets(exampleAssets);
      const totalValue = exampleAssets.reduce((acc, token) => acc + token.quantity, 0);
      setTotalPortfolioValue(totalValue / 1_000_000); // Convert to ADA
      setIsExampleData(true);
    }
  }, [walletAddress, tokenList]);

  const chartData = {
    labels: assets.map(asset => asset.assetName || 'ADA'),
    datasets: [
      {
        label: 'Portfolio Distribution',
        data: assets.map(asset => asset.quantity / 1_000_000), // Normalize for ADA units
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

  return (
    <div className="assets-container">
      <h2 className="assets-header">Your Portfolio</h2>

      {/* Example Data Notice */}
      {isExampleData && (
        <p style={{ color: '#666', fontStyle: 'italic' }}>
          *Preloaded example data is displayed for demonstration purposes. Connect your wallet to view your actual assets.
        </p>
      )}

      {/* Portfolio Overview Section */}
      <section className="portfolio-overview">
        <div className="info-card">
          <h3>Total Portfolio Value</h3>
          <p>{totalPortfolioValue.toLocaleString()} ADA</p>
        </div>
        <div className="info-card">
          <h3>Total Tokens Held</h3>
          <p>{assets.length}</p>
        </div>
      </section>

      {/* Portfolio Distribution Chart */}
      <section className="portfolio-distribution">
        <h3>Portfolio Distribution</h3>
        <div className="chart-wrapper">
          <Pie data={chartData} options={chartOptions} />
        </div>
      </section>

      {/* List of Tokens */}
      <section className="asset-list">
        <h3>Your Assets</h3>
        <table className="asset-table">
          <thead>
            <tr>
              <th>Asset Name</th>
              <th>Policy ID</th>
              <th>Quantity (ADA)</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((token, index) => (
              <tr key={index}>
                <td>{token.assetName || 'ADA'}</td>
                <td>{token.policyId || '—'}</td>
                <td>{(token.quantity / 1_000_000).toFixed(6)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Assets;
