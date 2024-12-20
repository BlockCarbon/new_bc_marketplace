import React, { useState } from 'react';
import { useWallet } from '../context/WalletContext'; // Import WalletContext hook
import metamaskLogo from '../assets/metamask.png';
import namiLogo from '../assets/nami.png';

const WalletConnect = () => {
  const { walletAddress, walletType, connectWallet } = useWallet(); // Use global context from WalletContext
  const [error, setError] = useState('');

  // 🔥 Function to connect MetaMask
  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        connectWallet('MetaMask', accounts[0]); // Update global context
      } catch (err) {
        setError('Failed to connect MetaMask wallet');
      }
    } else {
      setError('MetaMask is not installed');
    }
  };

  // 🔥 Function to connect Nami Wallet (Cardano)
  const connectNamiWallet = async () => {
    if (window.cardano && window.cardano.nami) {
      try {
        const namiApi = await window.cardano.nami.enable();
        const namiAccounts = await namiApi.getUsedAddresses();
        connectWallet('Nami', namiAccounts[0]); // Update global context
      } catch (err) {
        setError('Failed to connect Nami wallet');
      }
    } else {
      setError('Nami Wallet is not installed');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      <h2 style={{ marginBottom: '20px' }}>Connect Your Wallet</h2>

      {/* Wallet Buttons Container */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          flexWrap: 'wrap',
          marginTop: '20px',
        }}
      >
        {/* MetaMask Button */}
        <button
          onClick={connectMetaMask}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            backgroundColor: '#f6851b',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            padding: '10px 20px',
            cursor: 'pointer',
            width: '200px',
            height: '50px',
            fontSize: '16px',
            transition: 'all 0.3s ease-in-out',
          }}
        >
          <img src={metamaskLogo} alt="MetaMask Logo" style={{ width: '24px', height: '24px' }} />
          Connect MetaMask
        </button>

        {/* Nami Wallet Button */}
        <button
          onClick={connectNamiWallet}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            padding: '10px 20px',
            cursor: 'pointer',
            width: '200px',
            height: '50px',
            fontSize: '16px',
            transition: 'all 0.3s ease-in-out',
          }}
        >
          <img src={namiLogo} alt="Nami Logo" style={{ width: '24px', height: '24px' }} />
          Connect Nami Wallet
        </button>
      </div>

      {/* Wallet Connection Status */}
      <div style={{ marginTop: '30px', fontSize: '16px' }}>
        {walletAddress && (
          <p>
            <strong>Connected Wallet ({walletType}):</strong> {walletAddress.slice(0, 6)}...
            {walletAddress.slice(-4)}
          </p>
        )}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};

export default WalletConnect;
