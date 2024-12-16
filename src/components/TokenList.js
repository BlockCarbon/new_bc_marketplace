import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TokenList.css';

const TokenList = () => {
  const [tokens, setTokens] = useState([]); // List of tokens to display
  const [allTokens, setAllTokens] = useState([]); // Store the full list of tokens
  const [loading, setLoading] = useState(true); // Show loading status
  const [showCarbonOnly, setShowCarbonOnly] = useState(false); // Toggle state for carbon tokens

  // 🔥 Function to fetch all tokens from CoinGecko (default view)
  const fetchAllTokens = async () => {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: 50, // Number of tokens to fetch
          page: 1, // Page number
        },
      });
      setTokens(response.data); // Set the display tokens
      setAllTokens(response.data); // Store all tokens for later toggle
    } catch (error) {
      console.error('Error fetching all tokens:', error);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Function to filter tokens to only show carbon tokens
  const filterCarbonTokens = () => {
    const carbonTokens = allTokens.filter(token => 
      token.name.toLowerCase().includes('carbon') || 
      token.symbol.toLowerCase().includes('co2')
    );
    setTokens(carbonTokens);
  };

  // 🔥 Function to auto-refresh live prices every 60 seconds
  const updateLivePrices = async () => {
    try {
      const ids = allTokens.map(token => token.id).join(',');
      const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
        params: {
          ids: ids,
          vs_currencies: 'usd',
        },
      });

      const updatedTokens = allTokens.map(token => ({
        ...token,
        price: response.data[token.id]?.usd || token.current_price, // Update price if available
      }));

      setTokens(showCarbonOnly 
        ? updatedTokens.filter(token => token.name.toLowerCase().includes('carbon') || token.symbol.toLowerCase().includes('co2')) 
        : updatedTokens
      );

      setAllTokens(updatedTokens);
    } catch (error) {
      console.error('Error updating live prices:', error);
    }
  };

  // 🟢 Call fetchAllTokens on component mount
  useEffect(() => {
    fetchAllTokens();
  }, []);

  // 🔄 Auto-refresh live prices every 60 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      updateLivePrices();
    }, 60000); // 60 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [allTokens, showCarbonOnly]);

  // 🔥 Toggle between All Tokens and Carbon Tokens
  const handleToggle = () => {
    if (showCarbonOnly) {
      // Show all tokens (reset to all tokens)
      setTokens(allTokens);
      setShowCarbonOnly(false);
    } else {
      // Show only carbon tokens
      filterCarbonTokens();
      setShowCarbonOnly(true);
    }
  };

  if (loading) return <p>Loading tokens...</p>;

  return (
    <div className="token-list">
      <h2>Available Tokens</h2>
      <button onClick={handleToggle} className="filter-button">
        {showCarbonOnly ? 'Show All Tokens' : 'Show Only Carbon Tokens'}
      </button>
      <div className="token-container">
        {tokens.length > 0 ? (
          tokens.map(token => (
            <div className="token-card" key={token.id}>
              <img src={token.image} alt={token.name} className="token-image" />
              <h3>{token.name} ({token.symbol.toUpperCase()})</h3>
              <p>Price: ${token.current_price ? token.current_price.toFixed(2) : 'N/A'}</p>
            </div>
          ))
        ) : (
          <p>No tokens available.</p>
        )}
      </div>
    </div>
  );
};

export default TokenList;
