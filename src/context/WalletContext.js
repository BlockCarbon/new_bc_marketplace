import React, { createContext, useContext, useState } from 'react';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [walletBalance, setWalletBalance] = useState(0); // 🔥 Store wallet balance
  const [tokenList, setTokenList] = useState([]); // 🔥 Store native tokens

  const connectWallet = async () => {
    if (window.cardano && window.cardano.nami) {
      try {
        const api = await window.cardano.nami.enable();
        const balance = await api.getBalance();
        setWalletBalance(balance); // Store balance
        const tokens = await api.getAssets();
        setTokenList(tokens); // Store list of native tokens
        setWalletAddress('your wallet address'); // Placeholder
      } catch (error) {
        console.error('Error connecting to Nami wallet:', error);
      }
    } else {
      alert('Nami Wallet is required to use this feature. Please install it.');
    }
  };

  return (
    <WalletContext.Provider value={{ walletAddress, walletBalance, tokenList, connectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
