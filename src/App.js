import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { WalletProvider, useWallet } from './context/WalletContext'; // Only import WalletProvider
import Homepage from './components/Homepage';
import Dashboard from './components/Dashboard';
import Assets from './components/Assets'; // Updated to use correct component name
import Navigation from './components/Navigation'; 
import Footer from './components/Footer'; 
import TokenList from './components/TokenList'; 
import './index.css';

const App = () => {
  return (
    <WalletProvider> 
      <Router>
        <header>
          <h1>BlockCarbon Marketplace</h1>
          <WalletButton /> {/* Wallet button added to header for visibility */}
        </header>
        
        <Navigation />
        
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/assets" element={<Assets />} /> {/* Updated from AssetDetail to Assets */}
          <Route path="/tokens" element={<TokenList />} />
        </Routes>
        
        <Footer />
      </Router>
    </WalletProvider>
  );
};

const WalletButton = () => {
  const { walletAddress, connectWallet } = useWallet();

  return (
    <button onClick={connectWallet} className="wallet-button">
      {walletAddress 
        ? `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` 
        : 'Connect Wallet'}
    </button>
  );
};

export default App;
