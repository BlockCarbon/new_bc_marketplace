import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <ul style={{ display: 'flex', gap: '10px', listStyle: 'none', padding: 0 }}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/assets">Assets</Link></li>
        <li><Link to="/tokens">View Tokens</Link></li>
      </ul>
    </nav>
  );
};

export default Navigation;
