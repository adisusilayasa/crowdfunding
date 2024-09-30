# Crowdfunding DApp

This is a decentralized crowdfunding application built using [React](https://reactjs.org/), [Vite](https://vitejs.dev/), and [TypeScript](https://www.typescriptlang.org/). The application leverages [Web3] technologies to ensure that funds are directly transferred to the creator's wallet without any fees. The smart contracts are deployed using [Thirdweb](https://thirdweb.com/) and written in [Solidity](https://soliditylang.org/). [MetaMask](https://metamask.io/) is used as the wallet for transactions.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Smart Contract](#smart-contract)
- [Deploying the Smart Contract](#deploying-the-smart-contract)
- [Contributing](#contributing)
- [License](#license)

## Features

- Create crowdfunding campaigns
- Direct transfer of funds to the creator's wallet
- No transaction fees
- Secure and transparent transactions using blockchain technology
- MetaMask integration for wallet management

## Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed
- MetaMask extension installed in your browser
- A Thirdweb account for deploying smart contracts
- Basic understanding of Solidity and smart contracts

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/crowdfunding-dapp.git
    cd crowdfunding-dapp
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add your Thirdweb project details:

    ```plaintext
    VITE_THIRDWEB_PROJECT_ID=your_project_id
    VITE_THIRDWEB_PRIVATE_KEY=your_private_key
    ```

## Usage

1. Start the development server:

    ```bash
    npm run dev
    ```

2. Open your browser and navigate to `http://localhost:3000`.

3. Connect your MetaMask wallet.

4. Create a new crowdfunding campaign by filling out the required details.

5. Share your campaign link to start receiving funds directly to your wallet.

## Smart Contract

The smart contract for this application is written in Solidity and deployed using Thirdweb. Below is a basic example of the crowdfunding contract:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Crowdfunding {
    address public owner;
    mapping(address => uint256) public contributions;

    event ContributionReceived(address contributor, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    function contribute() public payable {
        require(msg.value > 0, "Contribution must be greater than 0");
        contributions[msg.sender] += msg.value;
        emit ContributionReceived(msg.sender, msg.value);
    }

    function withdraw() public {
        require(msg.sender == owner, "Only the owner can withdraw funds");
        payable(owner).transfer(address(this).balance);
    }
}
```

## Deploying the Smart Contract

To deploy the smart contract to Thirdweb, follow these steps:

1. **Install Thirdweb CLI**: If you haven't already, install the Thirdweb CLI globally:

    ```bash
    npm install -g @thirdweb-dev/cli
    ```

2. **Login to Thirdweb**: Authenticate your CLI with Thirdweb:

    ```bash
    thirdweb login
    ```

3. **Create a Project**: If you don't have a project yet, create one on the Thirdweb dashboard and note the project ID.

4. **Deploy the Contract**: Navigate to the directory containing your smart contract and deploy it:

    ```bash
    thirdweb deploy
    ```

    Follow the prompts to select your project and network (e.g., Ethereum, Polygon).

5. **Update Environment Variables**: After deploying, update your `.env` file with the deployed contract address:

    ```plaintext
    VITE_CONTRACT_ADDRESS=your_deployed_contract_address
    ```

6. **Integrate with Frontend**: Ensure your frontend code is set up to interact with the deployed contract using the contract address from the `.env` file.

## Contributing

Contributions are always welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature`).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
