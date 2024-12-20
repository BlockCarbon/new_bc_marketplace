import React, { useEffect, useState } from 'react';
import WalletConnect from './WalletConnect';
import axios from 'axios';
import Chart from 'chart.js/auto'; // For graph/chart visualization
import './Homepage.css'; // Add custom styles for the homepage

const Homepage = () => {
  const [totalMarketCap, setTotalMarketCap] = useState(0);
  const [totalTokensListed, setTotalTokensListed] = useState(0);
  const [averageTokenPrice, setAverageTokenPrice] = useState(0);
  const [topGainers, setTopGainers] = useState([]);
  const [topLosers, setTopLosers] = useState([]);
  const [trendingTokens, setTrendingTokens] = useState([]);

  // 🔥 Fetch Market Data from CoinGecko (or your API)
  const fetchMarketData = async () => {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: 50,
          page: 1,
        },
      });

      const tokens = response.data;

      setTotalTokensListed(tokens.length);
      const totalCap = tokens.reduce((acc, token) => acc + token.market_cap, 0);
      setTotalMarketCap(totalCap);
      
      const avgPrice = tokens.reduce((acc, token) => acc + token.current_price, 0) / tokens.length;
      setAverageTokenPrice(avgPrice);

      // Top Gainers & Losers
      const sortedByChange = [...tokens].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
      setTopGainers(sortedByChange.slice(0, 5)); // Top 5 gainers
      setTopLosers(sortedByChange.slice(-5).reverse()); // Bottom 5 (reversed for ascending order)
      
      // Trending Tokens (can customize logic here)
      setTrendingTokens(tokens.slice(0, 10)); // Show 10 trending tokens
    } catch (error) {
      console.error('Error fetching market data:', error);
    }
  };

  // 🔄 Call fetchMarketData on component mount
  useEffect(() => {
    fetchMarketData();
  }, []);

  return (
    <div className="homepage">
      {/* 🌟 Hero Section */}
      <section className="hero-section">
        <h1>Welcome to the Carbon Marketplace</h1>
        <p>Explore and trade carbon credits securely and transparently.</p>
        <WalletConnect />
      </section>

      {/* 📊 Market Overview */}
      <section className="market-overview">
        <h2>Market Overview</h2>
        <div className="overview-cards">
          <div className="info-card">
            <h3>Total Market Cap</h3>
            <p>${totalMarketCap.toLocaleString()}</p>
          </div>
          <div className="info-card">
            <h3>Total Tokens Listed</h3>
            <p>{totalTokensListed}</p>
          </div>
          <div className="info-card">
            <h3>Average Token Price</h3>
            <p>${averageTokenPrice.toFixed(2)}</p>
          </div>
        </div>
      </section>

      {/* 🚀 Top Gainers & Losers */}
      <section className="top-movers">
        <h2>Top Gainers & Losers</h2>
        <div className="movers-container">
          <div className="movers-column">
            <h3>Top Gainers</h3>
            {topGainers.map(token => (
              <div key={token.id} className="mover-card">
                <img src={token.image} alt={token.name} className="token-image" />
                <h4>{token.name} ({token.symbol.toUpperCase()})</h4>
                <p>+{token.price_change_percentage_24h.toFixed(2)}%</p>
              </div>
            ))}
          </div>
          <div className="movers-column">
            <h3>Top Losers</h3>
            {topLosers.map(token => (
              <div key={token.id} className="mover-card">
                <img src={token.image} alt={token.name} className="token-image" />
                <h4>{token.name} ({token.symbol.toUpperCase()})</h4>
                <p style={{ color: 'red' }}>{token.price_change_percentage_24h.toFixed(2)}%</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🚀 Trending Tokens */}
      <section className="trending-tokens">
        <h2>Trending Tokens</h2>
        <div className="trending-container">
          {trendingTokens.map(token => (
            <div key={token.id} className="trending-card">
              <img src={token.image} alt={token.name} className="token-image" />
              <h4>{token.name} ({token.symbol.toUpperCase()})</h4>
              <p>${token.current_price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Homepage;

