import React, { createContext, useContext, useState } from 'react';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [walletBalance, setWalletBalance] = useState(0);
  const [tokenList, setTokenList] = useState([]);

  // Connect wallet and fetch data
  const connectWallet = async () => {
    if (window.cardano) {
      try {
        // Detect wallets with the `enable` function
        const availableWallets = Object.keys(window.cardano).filter(wallet => window.cardano[wallet]?.enable);
        console.log('Available wallets:', availableWallets);

        if (availableWallets.length === 0) {
          alert('No compatible Cardano wallets detected. Please install one like Eternl, Lace, Flint, or Yoroi.');
          return;
        }

        // Prompt user to select a wallet
        const selectedWallet = prompt(
          `Available wallets: ${availableWallets.join(', ')}\nPlease type the name of the wallet you want to connect:`
        );

        if (!selectedWallet || !window.cardano[selectedWallet]) {
          alert('Invalid wallet selection or no wallet selected.');
          return;
        }

        // Enable the selected wallet
        const walletApi = await window.cardano[selectedWallet].enable();

        // Fetch wallet address
        const addresses = await walletApi.getUsedAddresses();
        if (addresses.length > 0) {
          setWalletAddress(addresses[0]); // Use the first address directly
        } else {
          throw new Error('No wallet addresses found.');
        }

        // Fetch wallet balance and convert to ADA
        const balance = await walletApi.getBalance();
        setWalletBalance(parseFloat(balance) / 1_000_000); // Convert lovelace to ADA

        // Fetch UTXOs to retrieve tokens
        const utxos = await walletApi.getUtxos();
        console.log('UTXOs:', utxos); // Log UTXOs for debugging
        const tokens = parseUtxos(utxos);
        setTokenList(tokens);

        alert(`Connected to ${selectedWallet} successfully!`);
      } catch (error) {
        console.error('Error connecting to wallet:', error);
        alert('Failed to connect to the wallet. Please try again.');
      }
    } else {
      alert('No Cardano wallet detected. Please install a compatible wallet like Lace, Eternl, Flint, or Yoroi.');
    }
  };

  // Refresh wallet data without reconnecting
  const refreshWalletData = async () => {
    if (window.cardano) {
      try {
        const availableWallets = Object.keys(window.cardano).filter(wallet => window.cardano[wallet]?.enable);
        if (availableWallets.length === 0) return;

        const walletName = availableWallets[0];
        const walletApi = await window.cardano[walletName].enable();

        // Fetch wallet balance
        const balance = await walletApi.getBalance();
        setWalletBalance(parseFloat(balance) / 1_000_000); // Convert lovelace to ADA

        // Fetch UTXOs to retrieve tokens
        const utxos = await walletApi.getUtxos();
        console.log('UTXOs:', utxos); // Log UTXOs for debugging
        const tokens = parseUtxos(utxos);
        setTokenList(tokens);
      } catch (error) {
        console.error('Error refreshing wallet data:', error);
      }
    }
  };

  // Helper function to parse UTXOs and extract tokens
  const parseUtxos = (utxos) => {
    const tokens = [];
    utxos.forEach((utxo) => {
      const output = utxo.output || utxo;
      output.amount.forEach((asset) => {
        if (asset.unit !== 'lovelace') {
          tokens.push({
            policyId: asset.unit.slice(0, 56), // Extract policy ID
            assetName: hexToString(asset.unit.slice(56)), // Decode asset name
            quantity: asset.quantity,
          });
        }
      });
    });
    return tokens;
  };

  // Helper function to decode hex strings to readable text
  const hexToString = (hex) => {
    try {
      return decodeURIComponent(
        hex
          .match(/.{1,2}/g)
          .map((byte) => `%${byte}`)
          .join('')
      );
    } catch (error) {
      console.error('Error decoding hex string:', error);
      return hex;
    }
  };

  return (
    <WalletContext.Provider
      value={{
        walletAddress,
        walletBalance,
        tokenList,
        connectWallet,
        refreshWalletData,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
