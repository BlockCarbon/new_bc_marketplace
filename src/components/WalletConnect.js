import React from 'react';
import { useWallet } from '../context/WalletContext';
import metamaskLogo from '../assets/metamask.png';
import namiLogo from '../assets/nami.png';

const WalletConnect = () => {
  const { walletAddress, connectMetaMask, connectNami, disconnectWallet } = useWallet();

  return (
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      <h2 style={{ marginBottom: '20px' }}>Connect Your Wallet</h2>

      {/* Wallet Connect Buttons */}
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
            backgroundColor: walletAddress ? '#6c757d' : '#f6851b',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            padding: '10px 20px',
            cursor: walletAddress ? 'not-allowed' : 'pointer',
            width: '200px',
            height: '50px',
            fontSize: '16px',
            transition: 'all 0.3s ease-in-out',
          }}
          disabled={walletAddress}
        >
          <img src={metamaskLogo} alt="MetaMask Logo" style={{ width: '24px', height: '24px' }} />
          {walletAddress ? 'Connected' : 'Connect MetaMask'}
        </button>

        {/* Nami Wallet Button */}
        <button
          onClick={connectNami}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            backgroundColor: walletAddress ? '#6c757d' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            padding: '10px 20px',
            cursor: walletAddress ? 'not-allowed' : 'pointer',
            width: '200px',
            height: '50px',
            fontSize: '16px',
            transition: 'all 0.3s ease-in-out',
          }}
          disabled={walletAddress}
        >
          <img src={namiLogo} alt="Nami Logo" style={{ width: '24px', height: '24px' }} />
          {walletAddress ? 'Connected' : 'Connect Nami'}
        </button>
      </div>

      {/* Wallet Address & Disconnect Button */}
      <div style={{ marginTop: '30px', fontSize: '16px' }}>
        {walletAddress && (
          <>
            <p>Connected Address: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</p>
            <button
              onClick={disconnectWallet}
              style={{
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                padding: '10px 20px',
                cursor: 'pointer',
                fontSize: '16px',
                marginTop: '10px',
                transition: 'all 0.3s ease-in-out',
              }}
            >
              Disconnect Wallet
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default WalletConnect;
