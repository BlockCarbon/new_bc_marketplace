import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Homepage from './components/Homepage';
import Dashboard from './components/Dashboard';
import AssetDetail from './components/AssetDetail';
import Navigation from './components/Navigation'; // Only if Navigation.js exists
import Footer from './components/Footer'; // Only if Footer.js exists
import TokenList from './components/TokenList'; // Import the TokenList component
import './index.css';

const App = () => {
  return (
    <Router>
      {/* Use Navigation only if it's part of the project */}
      <Navigation />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/assets" element={<AssetDetail />} />
        {/* New route to display the TokenList page */}
        <Route path="/tokens" element={<TokenList />} />
      </Routes>
      {/* Use Footer only if it's part of the project */}
      <Footer />
    </Router>
  );
};

export default App;

