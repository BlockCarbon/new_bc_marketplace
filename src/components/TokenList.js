import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TokenList.css';

const TokenList = () => {
  const [tokens, setTokens] = useState([]); // CoinGecko tokens
  const [allTokens, setAllTokens] = useState([]); // All tokens for filtering
  const [userTokens, setUserTokens] = useState([]); // User-submitted tokens
  const [loading, setLoading] = useState(true);
  const [showCarbonOnly, setShowCarbonOnly] = useState(false); // Toggle carbon tokens

  // State for form input
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    amount: '',
    price: '',
  });

  // Fetch CoinGecko tokens
  const fetchAllTokens = async () => {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
        params: { vs_currency: 'usd', order: 'market_cap_desc', per_page: 20, page: 1 },
      });
      setTokens(response.data);
      setAllTokens(response.data);
    } catch (error) {
      console.error('Error fetching tokens:', error);
    } finally {
      setLoading(false);
    }
  };

  // Update live prices every 60 seconds
  const updateLivePrices = async () => {
    try {
      const ids = allTokens.map(token => token.id).join(',');
      const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
        params: { ids, vs_currencies: 'usd' },
      });

      const updatedTokens = allTokens.map(token => ({
        ...token,
        current_price: response.data[token.id]?.usd || token.current_price,
      }));

      setTokens(showCarbonOnly
        ? updatedTokens.filter(token => token.name.toLowerCase().includes('carbon'))
        : updatedTokens
      );

      setAllTokens(updatedTokens);
    } catch (error) {
      console.error('Error updating prices:', error);
    }
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newToken = {
      id: Date.now(), // Temporary ID
      name: formData.name,
      symbol: formData.symbol.toUpperCase(),
      amount: formData.amount,
      price: parseFloat(formData.price).toFixed(2),
    };
    setUserTokens([...userTokens, newToken]);
    setFormData({ name: '', symbol: '', amount: '', price: '' });
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Toggle carbon tokens
  const handleToggle = () => {
    setShowCarbonOnly(!showCarbonOnly);
    if (!showCarbonOnly) {
      const carbonTokens = allTokens.filter(token =>
        token.name.toLowerCase().includes('carbon') || token.symbol.toLowerCase().includes('co2')
      );
      setTokens(carbonTokens);
    } else {
      setTokens(allTokens);
    }
  };

  // Initial fetch and price update
  useEffect(() => {
    fetchAllTokens();
    const interval = setInterval(updateLivePrices, 60000);
    return () => clearInterval(interval);
  }, [showCarbonOnly]);

  return (
    <div className="token-list">
      <h2>Available Tokens</h2>
      <button onClick={handleToggle} className="filter-button">
        {showCarbonOnly ? 'Show All Tokens' : 'Show Only Carbon Tokens'}
      </button>

      {loading ? (
        <p>Loading tokens...</p>
      ) : (
        <div className="token-container">
          {tokens.map(token => (
            <div key={token.id} className="token-card">
              <img src={token.image} alt={token.name} className="token-image" />
              <h3>{token.name} ({token.symbol})</h3>
              <p>Price: ${token.current_price ? token.current_price.toFixed(2) : 'N/A'}</p>
            </div>
          ))}
        </div>
      )}

      {/* Form to List User Tokens */}
      <div className="form-container">
        <h3>List Your Token for Sale</h3>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Token Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="symbol"
            placeholder="Symbol"
            value={formData.symbol}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price (USD)"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
          <button type="submit" className="submit-button">List Token</button>
        </form>
      </div>

      {/* Display User-Submitted Tokens */}
      <h3>Your Listed Tokens</h3>
      <div className="token-container">
        {userTokens.length > 0 ? (
          userTokens.map(token => (
            <div key={token.id} className="token-card">
              <h3>{token.name} ({token.symbol})</h3>
              <p>Amount: {token.amount}</p>
              <p>Price: ${token.price}</p>
            </div>
          ))
        ) : (
          <p>No tokens listed yet.</p>
        )}
      </div>
    </div>
  );
};

export default TokenList;
