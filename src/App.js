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
  return (
    <WalletProvider> 
      <Router>
        <header>
         <h1>My Marketplace</h1>
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
