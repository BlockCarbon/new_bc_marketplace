import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TokenList.css';

const TokenList = () => {
  const [tokens, setTokens] = useState([]); // CoinGecko tokens
  const [userTokens, setUserTokens] = useState([]); // User-listed tokens
  const [loading, setLoading] = useState(true); // Loading state
  const [showCarbonOnly, setShowCarbonOnly] = useState(false); // Toggle carbon-only tokens

  // 🔥 Function to fetch tokens from CoinGecko
  const fetchAllTokens = async () => {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
        params: { vs_currency: 'usd', order: 'market_cap_desc', per_page: 50, page: 1 },
      });
      setTokens(response.data);
    } catch (error) {
      console.error('Error fetching tokens:', error);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Filter Carbon Tokens
  const filterCarbonTokens = () => {
    return tokens.filter((token) =>
      token.name.toLowerCase().includes('carbon') || token.symbol.toLowerCase().includes('co2')
    );
  };

  // 🔥 Update Live Prices (every 60 seconds)
  const updateLivePrices = async () => {
    try {
      const ids = tokens.map((token) => token.id).join(',');
      const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
        params: { ids, vs_currencies: 'usd' },
      });

      const updatedTokens = tokens.map((token) => ({
        ...token,
        current_price: response.data[token.id]?.usd || token.current_price,
      }));

      setTokens(updatedTokens);
    } catch (error) {
      console.error('Error updating prices:', error);
    }
  };

  // 🟢 Form Submission to Add User Tokens
  const handleUserTokenSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const newUserToken = {
      id: Date.now(),
      name: formData.get('tokenName'),
      symbol: formData.get('symbol'),
      amount: formData.get('amount'),
      price: formData.get('price'),
    };

    setUserTokens([...userTokens, newUserToken]);
    e.target.reset();
  };

  // 🔄 UseEffect Hooks
  useEffect(() => {
    fetchAllTokens(); // Fetch CoinGecko tokens on mount
    const interval = setInterval(() => updateLivePrices(), 60000); // Update prices every 60s
    return () => clearInterval(interval);
  }, [tokens]);

  // 🟢 Handle Carbon Toggle
  const handleToggle = () => setShowCarbonOnly(!showCarbonOnly);

  return (
    <div className="token-list">
      <h2>Available Tokens</h2>

      {/* Carbon Token Toggle */}
      <button onClick={handleToggle} className="filter-button">
        {showCarbonOnly ? 'Show All Tokens' : 'Show Only Carbon Tokens'}
      </button>

      {/* Display CoinGecko Tokens */}
      {loading ? (
        <p>Loading tokens...</p>
      ) : (
        <div className="token-container">
          {(showCarbonOnly ? filterCarbonTokens() : tokens).map((token) => (
            <div className="token-card" key={token.id}>
              <img src={token.image} alt={token.name} className="token-image" />
              <h3>{token.name} ({token.symbol.toUpperCase()})</h3>
              <p>Price: ${token.current_price ? token.current_price.toFixed(2) : 'N/A'}</p>
            </div>
          ))}
        </div>
      )}

      <hr />

      {/* User-Listed Tokens Form */}
      <h2>List Your Token for Sale</h2>
      <form onSubmit={handleUserTokenSubmit}>
        <input name="tokenName" placeholder="Token Name" required />
        <input name="symbol" placeholder="Symbol" required />
        <input name="amount" type="number" placeholder="Amount" required />
        <input name="price" type="number" placeholder="Price (USD)" required />
        <button type="submit" className="submit-button">List Token</button>
      </form>

      {/* Display User-Listed Tokens */}
      <div className="token-container">
        {userTokens.length > 0 ? (
          userTokens.map((token) => (
            <div className="token-card" key={token.id}>
              <h3>{token.name} ({token.symbol.toUpperCase()})</h3>
              <p>Amount: {token.amount}</p>
              <p>Price: ${parseFloat(token.price).toFixed(2)}</p>
            </div>
          ))
        ) : (
          <p>No tokens listed for sale yet.</p>
        )}
      </div>
    </div>
  );
};

export default TokenList;
