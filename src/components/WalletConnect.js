import React, { useState } from 'react';

const WalletConnect = () => {
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAddress(accounts[0]);
      } catch (err) {
        setError('Failed to connect wallet');
      }
    } else {
      setError('MetaMask is not installed');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      {address && <p>Connected Address: {address}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <button
        onClick={connectWallet}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '20px',
        }}
      >
        Connect Wallet
      </button>
    </div>
  );
};

export default WalletConnect;
