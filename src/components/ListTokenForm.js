import React, { useState } from 'react';

const ListTokenForm = ({ onAddToken }) => {
  const [tokenName, setTokenName] = useState('');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tokenName || !amount || !price) {
      alert("Please fill in all fields");
      return;
    }

    // Pass token data to parent component
    onAddToken({ tokenName, amount: Number(amount), price: Number(price) });

    // Clear form
    setTokenName('');
    setAmount('');
    setPrice('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <h3>List Token for Sale</h3>
      <div>
        <label>Token Name:</label>
        <input
          type="text"
          value={tokenName}
          onChange={(e) => setTokenName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Price (USD):</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <button type="submit">List Token</button>
    </form>
  );
};

export default ListTokenForm;
