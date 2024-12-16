import React, { useState } from 'react'; // Import useState to manage wallet state
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Homepage from './components/Homepage';
import Dashboard from './components/Dashboard';
import AssetDetail from './components/AssetDetail';
import Navigation from './components/Navigation'; // Navigation bar
import Footer from './components/Footer'; // Footer section
import TokenList from './components/TokenList'; // Token list page
import './index.css';

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null); // Store the connected wallet address

  // 🟢 Function to connect to Nami Wallet (Cardano Wallet)
  const connectWallet = async () => {
    // Check if Nami Wallet is available
    if (!window.cardano || !window.cardano.nami) {
      alert('Nami Wallet is required to use this feature. Please install it.');
      return;
    }
    try {
      const api = await window.cardano.nami.enable(); // Connect to Nami wallet
      const addresses = await api.getUsedAddresses(); // Get wallet addresses
      const baseAddress = await api.getChangeAddress(); // Get base address
      setWalletAddress(baseAddress); // Store the first address in state
    } catch (error) {
      console.error('Error connecting to wallet:', error);
    }
  };

  return (
    <Router>
      <header>
        {/* Connect Wallet Button */}
        <button onClick={connectWallet} className="wallet-button">
          {walletAddress 
            ? `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` 
            : 'Connect Wallet'}
        </button>
      </header>

      <Navigation />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/assets" element={<AssetDetail />} />
        <Route path="/tokens" element={<TokenList />} />
      </Routes>
      
      <Footer />
    </Router>
  );
};

export default App;
