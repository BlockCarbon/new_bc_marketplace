import React, { useState, useEffect } from 'react';

const NetworkStatus = () => {
  const [status, setStatus] = useState("Loading...");

  useEffect(() => {
    // Hardcoded epoch status
    setStatus("Epoch: 533");
  }, []);

  return <p className="network-status">{status}</p>;
};

export default NetworkStatus;
