import React from 'react';
import { useWallet } from '../context/WalletContext'; // Adjusted import path

const WalletSelector = () => {
  const {
    walletAddress,
    walletBalance,
    availableWallets,
    selectedWallet,
    setSelectedWallet,
    connectWallet,
  } = useWallet();

  return (
    <div>
      {availableWallets.length > 0 ? (
        <div>
          <label htmlFor="wallets">Select Wallet:</label>
          <select
            id="wallets"
            value={selectedWallet || ''}
            onChange={(e) => setSelectedWallet(e.target.value)}
          >
            {availableWallets.map(wallet => (
              <option key={wallet} value={wallet}>
                {wallet.charAt(0).toUpperCase() + wallet.slice(1)}
              </option>
            ))}
          </select>
          <button onClick={connectWallet}>Connect Wallet</button>
        </div>
      ) : (
        <p>No supported wallets detected. Please install Eternl or Lace.</p>
      )}
      {walletAddress && <p>Connected Address: {walletAddress}</p>}
      {walletBalance > 0 && <p>Balance: {walletBalance} ADA</p>}
    </div>
  );
};

export default WalletSelector;
