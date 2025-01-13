import React, { createContext, useContext, useState, useEffect } from 'react';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [walletBalance, setWalletBalance] = useState(0);
  const [availableWallets, setAvailableWallets] = useState([]);
  const [selectedWallet, setSelectedWallet] = useState(null);

  const detectWallets = () => {
    if (window.cardano) {
      const supportedWallets = ['eternl', 'lace'];
      const detected = supportedWallets.filter(wallet => window.cardano[wallet]?.enable);
      setAvailableWallets(detected);

      if (detected.length > 0) {
        setSelectedWallet(detected[0]); // Default to the first detected wallet
      }
    } else {
      alert('No Cardano wallets found. Please install Eternl or Lace.');
    }
  };

  const connectWallet = async () => {
    if (!selectedWallet) {
      alert('Please select a wallet to connect.');
      return;
    }

    try {
      const walletApi = await window.cardano[selectedWallet].enable();

      const addresses = await walletApi.getUsedAddresses();
      if (addresses.length > 0) {
        setWalletAddress(addresses[0]);
      } else {
        throw new Error('No wallet addresses found.');
      }

      const balance = await walletApi.getBalance();
      setWalletBalance(parseFloat(balance) / 1_000_000); // Convert Lovelace to ADA

      alert(`Connected to ${selectedWallet} successfully!`);
    } catch (error) {
      console.error('Error connecting to wallet:', error);
      alert('Failed to connect to the wallet. Please try again.');
    }
  };

  useEffect(() => {
    detectWallets();
  }, []);

  return (
    <WalletContext.Provider value={{
      walletAddress,
      walletBalance,
      availableWallets,
      selectedWallet,
      setSelectedWallet,
      connectWallet,
    }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
