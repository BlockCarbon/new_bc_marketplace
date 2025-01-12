import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { WalletProvider } from './context/WalletContext';
import Homepage from './components/Homepage';
import Dashboard from './components/Dashboard';
import AssetDetail from './components/Assets';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import TokenList from './components/TokenList';
import './index.css';

const App = () => {
  const currentEpoch = 533; // Hardcoded epoch value

  return (
    <WalletProvider>
      <Router>
        <header style={{ padding: '20px', backgroundColor: '#282c34', color: 'white' }}>
          <h1>BlockCarbon Marketplace</h1>
          <p style={{ color: '#17a2b8', margin: '5px 0' }}>Epoch: {currentEpoch} (Predicted)</p>
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
    </WalletProvider>
  );
};

export default App;
