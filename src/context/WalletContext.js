import React, { createContext, useContext, useState } from 'react';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState('');
  const [walletType, setWalletType] = useState('');

  const connectWallet = async () => {
    if (!window.cardano || !window.cardano.nami) {
      alert('Nami Wallet is required to use this feature. Please install it.');
      return;
    }
    try {
      const api = await window.cardano.nami.enable();
      const addresses = await api.getUsedAddresses();
      const baseAddress = await api.getChangeAddress();
      setWalletAddress(baseAddress); // Store the first address in global state
      setWalletType('Nami');
    } catch (error) {
      console.error('Error connecting to wallet:', error);
    }
  };

  return (
    <WalletContext.Provider value={{ walletAddress, walletType, connectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
