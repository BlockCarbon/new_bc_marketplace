import React from 'react';
import { useWallet } from '../context/WalletContext';

const WalletConnect = () => {
  const {
    walletAddress,
    selectedWallet,
    availableWallets,
    setSelectedWallet,
    connectWallet,
    disconnectWallet,
  } = useWallet();

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '20vh',
        flexDirection: 'column',
        textAlign: 'center',
        padding: '5px',
        margin: '0 auto',
      }}
    >
      {/* Dynamic Heading */}
      <h2 style={{ marginBottom: '10px', fontSize: '16px' }}>
        {walletAddress ? 'Manage Your Wallet' : 'Connect Your Wallet'}
      </h2>

      {/* Wallet Selector Dropdown */}
      <select
        value={selectedWallet || ''}
        onChange={(e) => setSelectedWallet(e.target.value)}
        style={{
          padding: '8px',
          fontSize: '14px',
          borderRadius: '5px',
          marginBottom: '10px',
          backgroundColor: !!walletAddress ? '#f0f0f0' : 'white',
          color: !!walletAddress ? '#6c757d' : 'black',
          cursor: !!walletAddress ? 'not-allowed' : 'pointer',
        }}
        disabled={!!walletAddress} // Disable dropdown if a wallet is connected
      >
        <option value="" disabled>
          Select Wallet
        </option>
        {availableWallets.map((wallet) => (
          <option key={wallet} value={wallet}>
            {wallet}
          </option>
        ))}
      </select>

      {/* Conditional Connect/Disconnect Button */}
      {walletAddress ? (
        <button
          onClick={disconnectWallet}
          style={{
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            padding: '10px 20px',
            cursor: 'pointer',
            fontSize: '14px',
            transition: 'all 0.3s ease-in-out',
          }}
        >
          Disconnect Wallet
        </button>
      ) : (
        <button
          onClick={connectWallet}
          style={{
            backgroundColor: selectedWallet ? '#007bff' : '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            padding: '10px 20px',
            cursor: selectedWallet ? 'pointer' : 'not-allowed',
            fontSize: '14px',
            transition: 'all 0.3s ease-in-out',
          }}
          disabled={!selectedWallet} // Disable button if no wallet is selected
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default WalletConnect;
