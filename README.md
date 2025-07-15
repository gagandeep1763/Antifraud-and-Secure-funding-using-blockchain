# Antifrauds and Secure Funding Using Blockchain

A decentralized crowdfunding platform built using React, Truffle, and Ethereum. 
This project ensures secure, transparent, and fraud-resistant funding by utilizing blockchain technology. 
It removes third-party dependencies and guarantees that every transaction is verifiable and tamper-proof. 
The platform also includes a login and registration system, allowing users to securely manage access and interact with campaigns.

---

## Key Features

- Smart contract-based campaign funding system
- ETH transactions via MetaMask directly from the UI
- Login and Registration using localStorage for session management
- Role-based navigation: Home, About, Profile, Campaigns, Logout
- Real-time display of campaign details and donation interface
- Fully local development using Ganache for blockchain simulation
- Interactive frontend with React and Web3 integration

---

## Tech Stack

| Layer         | Technology              |
|---------------|-------------------------|
| Smart Contract | Solidity, Truffle       |
| Blockchain     | Ganache (Local Ethereum)|
| Frontend       | React.js, Web3.js       |
| Wallet         | MetaMask                |
| Styling        | Bootstrap, Custom CSS   |
| Auth Storage   | localStorage (browser)  |

---

## How It Works

1. New users can register and login — credentials are stored in browser localStorage.
2. Once logged in, the UI reveals the full navigation: Home, About, Profile, Campaigns, and Logout.
3. MetaMask is required to connect an Ethereum wallet to the platform.
4. All listed campaigns are visible under the Campaigns page.
5. Users can contribute ETH to any campaign, which is processed via the connected wallet and recorded on the local blockchain.
6. Contributions are logged on the blockchain using smart contracts deployed via Truffle.
7. The Logout option clears the session and returns the user to the Login screen.

---

## Setup Instructions

### Prerequisites

- Node.js and npm
- Ganache (GUI or CLI)
- MetaMask browser extension
- Git

---

1. Clone the Repository: 
git clone https://github.com/gagandeep1763/Antifrauds-and-Secure-Funding-using-Blockchain.git

cd Antifrauds-and-Secure-Funding-using-Blockchain

2. Install Backend Dependencies
   
npm install

3. Compile the Smart Contracts

npx truffle compile

4. Start Ganache
   
Launch Ganache GUI and create a new workspace
npx ganache
This simulates a local Ethereum blockchain at http://127.0.0.1:7545.

5. Deploy Contracts to Ganache

npx truffle migrate --reset
Make sure your truffle-config.js is configured with:
js
Copy
Edit
networks: {
  development: {
    host: "127.0.0.1",
    port: 7545,
    network_id: "*"
  }
}

6. Set Up the Frontend
Navigate to the frontend folder (e.g., fraud):
cd fraud
npm install

8. Start the React App

npm start
Visit the application at:
http://localhost:3000

8. Connect MetaMask
Open MetaMask browser extension.

Add a custom network:
Network Name: Ganache
RPC URL: http://127.0.0.1:7545
Chain ID: 1337 or 5777 (check Ganache interface)
Import one of the Ganache accounts using its private key.
Refresh the DApp and approve the MetaMask connection popup.
