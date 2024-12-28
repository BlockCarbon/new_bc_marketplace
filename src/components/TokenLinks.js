import React from "react";

const TokenLinks = () => {
  return (
    <div className="token-links">
      <h2>Explore BlockCarbon Tokens</h2>
      <ul>
        <li>
          <strong>Preview Testnet BlockCarbon Token:</strong>{" "}
          <a
            href="https://preview.cardanoscan.io/transaction/d5e955385d7451351491d338ef8b28f100e0ea2b393850bad6e2996a5a9d2233"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Transaction on Cardano Preview
          </a>
        </li>
        <li>
          <strong>Mainnet BlockCarbon REDD+ Token:</strong>{" "}
          <a
            href="https://pool.pm/asset1zyrr2a97t8kvtvh8gkfqlahla96q9lrn4m7lvj"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Token on Pool.pm
          </a>
        </li>
        <li>
          <strong>Ethereum Sepolia Minting Transaction:</strong>{" "}
          <a
            href="https://sepolia.etherscan.io/tx/0xc757a3d62d6cd759cadef7fc665ed4df905dd3573e7476887c05a7084f59c7ec"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Transaction on Sepolia Etherscan
          </a>
        </li>
      </ul>
    </div>
  );
};

export default TokenLinks;
