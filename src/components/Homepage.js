import React from 'react';
import WalletConnect from './WalletConnect';

const Homepage = () => {
  return (
    <div className="container">
      <h1>Welcome to the Carbon Marketplace</h1>
      <p>Explore and trade carbon credits securely.</p>
      <WalletConnect />
    </div>
  );
};

export default Homepage;

