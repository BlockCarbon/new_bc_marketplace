import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { WalletProvider } from './context/WalletContext';
import Homepage from './components/Homepage';
import Dashboard from './components/Dashboard';
import AssetDetail from './components/Assets'; // Independent from WalletContext
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import TokenList from './components/TokenList';

const App = () => {
  return (
    <Router>
      <header>
        <h1>BlockCarbon Marketplace</h1>
      </header>
      <Navigation />
      {/* Routes */}
      <Routes>
        {/* WalletProvider wraps only the components that depend on wallet state */}
        <Route
          path="/"
          element={
            <WalletProvider>
              <Homepage />
            </WalletProvider>
          }
        />
        <Route
          path="/dashboard"
          element={
            <WalletProvider>
              <Dashboard />
            </WalletProvider>
          }
        />
        {/* AssetDetail and TokenList are independent of WalletProvider */}
        <Route path="/assets" element={<AssetDetail />} />
        <Route path="/tokens" element={<TokenList />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;


