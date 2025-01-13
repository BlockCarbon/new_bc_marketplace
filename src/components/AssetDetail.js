import React, { useState, useEffect } from 'react';

const mockAssets = [
  { id: 1, name: 'Carbon Credit A', price: 50 },
  { id: 2, name: 'Carbon Credit B', price: 75 },
  { id: 3, name: 'Carbon Credit C', price: 100 },
];

const AssetDetail = () => {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    // Simulate fetching assets
    setTimeout(() => {
      setAssets(mockAssets);
    }, 500); // Simulated delay for independent fetching
  }, []);

  return (
    <div>
      <h2>Asset Details</h2>
      <p>View details about specific carbon credits.</p>
      {assets.length > 0 ? (
        <ul>
          {assets.map((asset) => (
            <li key={asset.id}>
              {asset.name}: ${asset.price}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading assets...</p>
      )}
    </div>
  );
};

export default AssetDetail;
