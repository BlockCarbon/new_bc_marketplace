import React from 'react';
import './TokenManagement.css';

const TokenManagement = () => {
  const tokens = [
    { name: 'REDD+ Token', bidPrice: 1.2, askPrice: 1.25 },
    { name: 'Sample Token A', bidPrice: 0.9, askPrice: 0.95 },
  ];

  // Message for Mint and Retire buttons
  const handleButtonClick = (action, tokenName) => {
    alert(`The ${action} feature for ${tokenName} is under development and will be available in a future update.`);
  };

  return (
    <div className="token-management-container">
      <h2>Token Management</h2>
      <table>
        <thead>
          <tr>
            <th>Token Name</th>
            <th>Bid Price (USD)</th>
            <th>Ask Price (USD)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token, index) => (
            <tr key={index}>
              <td>{token.name}</td>
              <td>${token.bidPrice.toFixed(2)}</td>
              <td>${token.askPrice.toFixed(2)}</td>
              <td>
                <button
                  className="mint-button"
                  onClick={() => handleButtonClick('Mint', token.name)}
                >
                  Mint
                </button>
                <button
                  className="retire-button"
                  onClick={() => handleButtonClick('Retire', token.name)}
                >
                  Retire
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TokenManagement;
