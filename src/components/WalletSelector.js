import React from 'react';
import { useWallet } from '../context/WalletContext'; // Adjust the path if necessary

const WalletSelector = () => {
  const { availableWallets, selectedWallet, setSelectedWallet } = useWallet();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '10px',
        margin: '0 auto',
        height: '20vh', // Compact height
      }}
    >
      <h2 style={{ fontSize: '16px', marginBottom: '8px' }}>Select a Wallet</h2>

      {/* Wallet Dropdown Selector */}
      <select
        value={selectedWallet || ''}
        onChange={(e) => setSelectedWallet(e.target.value)}
        style={{
          padding: '8px',
          borderRadius: '5px',
          border: '1px solid #ced4da',
          width: '200px',
          marginBottom: '10px',
        }}
      >
        <option value="" disabled>
          Select Wallet
        </option>
        {availableWallets.map((wallet) => (
          <option key={wallet} value={wallet}>
            {wallet.charAt(0).toUpperCase() + wallet.slice(1)} {/* Capitalizes wallet name */}
          </option>
        ))}
      </select>

      {/* No Wallets Available */}
      {availableWallets.length === 0 && (
        <p style={{ fontSize: '12px', color: 'red', marginTop: '8px' }}>
          No compatible wallets detected. Please install Eternl or Yoroi.
        </p>
      )}
    </div>
  );
};

export default WalletSelector;
