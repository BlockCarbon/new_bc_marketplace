import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Ensure the correct path to App.js
import './index.css'; // Import global styles if any

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
