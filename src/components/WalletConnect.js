import React from 'react';
import { useWallet } from '../context/WalletContext';

const WalletConnect = () => {
  const { walletAddress, walletBalance, tokenList, connectWallet, refreshWalletData, disconnectWallet } = useWallet();

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '20vh', // Compact height
        flexDirection: 'column',
        textAlign: 'center',
        padding: '5px',
        margin: '0 auto',
      }}
    >
      <h2 style={{ marginBottom: '5px', fontSize: '16px' }}>Connect Your Wallet</h2>

      {/* Wallet Connect Button */}
      <button
        onClick={connectWallet}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: walletAddress ? '#6c757d' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          padding: '8px 16px',
          cursor: walletAddress ? 'not-allowed' : 'pointer',
          width: '160px',
          height: '40px',
          fontSize: '12px',
          transition: 'all 0.3s ease-in-out',
        }}
        disabled={!!walletAddress}
      >
        {walletAddress ? 'Wallet Connected' : 'Connect Wallet'}
      </button>

      {/* Wallet Info Section */}
      {walletAddress && (
        <div style={{ marginTop: '5px', fontSize: '12px' }}>
          <p>
            <strong>Connected Address:</strong> {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
          </p>
          <p>
            <strong>Wallet Balance:</strong> {walletBalance} ADA
          </p>
          <button
            onClick={refreshWalletData}
            style={{
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              padding: '6px 12px',
              cursor: 'pointer',
              fontSize: '12px',
              marginTop: '5px',
            }}
          >
            Refresh Wallet Data
          </button>
          <button
            onClick={disconnectWallet}
            style={{
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              padding: '6px 12px',
              cursor: 'pointer',
              fontSize: '12px',
              marginTop: '5px',
              transition: 'all 0.3s ease-in-out',
            }}
          >
            Disconnect Wallet
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
