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
    git clone https://github.com/adisusilayasa/crowdfunding.git
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
contract MyContract {
    struct Campaign{
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
    }

    mapping(uint256 => Campaign) public campaigns;
    uint256 public numberOfCampaigns = 0;

    function createCampaign( address _owner, string memory _title, string memory _description, uint256 _target, uint256 _deadline, string memory _image) public returns (uint256) {
        Campaign memory campaign = campaigns[numberOfCampaigns];

        require(campaign.deadline < block.timestamp, "The date should be a date in the future");

        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.image = _image;
        campaign.amountCollected = 0;
        
        numberOfCampaigns++;

        return numberOfCampaigns - 1;
    }

    function donateToCampaign(uint256 _id) public payable {
        uint256 amount = msg.value;

        Campaign storage campaign = campaigns[_id];

        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        (bool sent, ) = payable(campaign.owner).call{value: amount}("");
        if(sent){
            campaign.amountCollected += amount;
        }
    }

    function getDonators(uint256 _id) public view returns (address[] memory, uint256[] memory) {
        Campaign storage campaign = campaigns[_id];
        return (campaign.donators, campaign.donations);
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);
        for (uint256 i = 0; i < numberOfCampaigns; i++) {
            allCampaigns[i] = campaigns[i];
        }
        return allCampaigns;
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
