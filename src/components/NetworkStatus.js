import React, { useState, useEffect } from 'react';

const NetworkStatus = () => {
  const [status, setStatus] = useState("Loading...");

  useEffect(() => {
    // Hardcoded epoch status
    setStatus("Epoch: 423 (Predicted)");
  }, []);

  return <p className="network-status">{status}</p>;
};

export default NetworkStatus;
