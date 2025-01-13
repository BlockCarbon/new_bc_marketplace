import React, { createContext, useContext, useState, useEffect } from 'react';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [walletBalance, setWalletBalance] = useState(0);
  const [availableWallets, setAvailableWallets] = useState([]); // Ensure default is an empty array
  const [selectedWallet, setSelectedWallet] = useState(null);

  // Detect supported wallets and populate the availableWallets state
  const detectWallets = () => {
    if (window.cardano) {
      const supportedWallets = ['eternl', 'yoroi'];
      const detected = supportedWallets.filter((wallet) => window.cardano[wallet]?.enable);
      setAvailableWallets(detected);

      if (detected.length > 0) {
        setSelectedWallet(detected[0]); // Default to the first detected wallet
      } else {
        console.warn('No supported wallets detected.');
      }
    } else {
      console.error('No Cardano wallets detected in the browser.');
      alert('No Cardano wallets detected. Please install Eternl or Yoroi.');
    }
  };

  // Fetch wallet addresses (used and unused) and set the wallet address
  const fetchWalletAddress = async (walletApi) => {
    try {
      let addresses = await walletApi.getUsedAddresses();
      if (!addresses || addresses.length === 0) {
        addresses = await walletApi.getUnusedAddresses();
      }

      if (addresses && addresses.length > 0) {
        const hexAddress = addresses[0];
        setWalletAddress(hexAddress); // Use raw address as hex
      } else {
        throw new Error('No wallet addresses found.');
      }
    } catch (error) {
      console.error('Error fetching wallet address:', error);
      throw new Error('Failed to retrieve wallet address.');
    }
  };

  // Fetch wallet balance and set it in ADA
  const fetchWalletBalance = async (walletApi) => {
    try {
      const balance = await walletApi.getBalance();
      setWalletBalance(parseFloat(balance) / 1_000_000); // Convert Lovelace to ADA
    } catch (error) {
      console.error('Error fetching wallet balance:', error);
      throw new Error('Failed to retrieve wallet balance.');
    }
  };

  // Connect to the selected wallet
  const connectWallet = async () => {
    if (!selectedWallet) {
      alert('Please select a wallet to connect.');
      return;
    }

    try {
      const walletApi = await window.cardano[selectedWallet].enable();
      await fetchWalletAddress(walletApi);
      await fetchWalletBalance(walletApi);
      alert(`Connected to ${selectedWallet} successfully!`);
    } catch (error) {
      console.error('Error connecting to wallet:', error);
      alert('Failed to connect to the wallet. Please try again.');
    }
  };

  // Disconnect the wallet
  const disconnectWallet = () => {
    setWalletAddress(null);
    setWalletBalance(0);
    setAvailableWallets([]); // Clear available wallets on disconnect
    setSelectedWallet(null);
    alert('Disconnected from wallet successfully.');
  };

  // Run detectWallets on component mount
  useEffect(() => {
    if (window.cardano) {
      detectWallets();
    }
  }, []);

  return (
    <WalletContext.Provider
      value={{
        walletAddress,
        walletBalance,
        availableWallets,
        selectedWallet,
        setSelectedWallet,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
