# Ethereum Deposit Tracker

This project is an Ethereum deposit tracker that continuously monitors the Ethereum blockchain for deposit transactions to a specific contract address. The tracker stores the details of each deposit in a MongoDB database. The application is built using Node.js, Web3.js, and MongoDB.

## Features

- **Blockchain Monitoring**: Polls the Ethereum mainnet for new blocks and checks for transactions to a specified deposit contract.
- **Database Storage**: Stores relevant transaction details such as block number, transaction hash, sender address, and amount in a MongoDB database.
- **Polling Interval**: The application checks for new blocks every 15 seconds.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Install Node.js (v14 or later recommended).
- **MongoDB**: Have a MongoDB database ready. You can use a local instance or a MongoDB Atlas cluster.
- **Alchemy/Infura API Key**: Sign up for an API key from [Alchemy](https://www.alchemy.com/) or [Infura](https://infura.io/) to access the Ethereum mainnet.

## Setup

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/your-username/eth-deposit-tracker.git
    cd eth-deposit-tracker
    ```

2. **Install Dependencies**:
    Install the required Node.js packages using npm:
    ```bash
    npm install
    ```

3. **Configure Environment Variables**:
    Replace the placeholders in the code with your own credentials:
    
    - **Alchemy/Infura RPC URL**: Replace the Alchemy/Infura URL in the `web3` initialization with your own.
    - **MongoDB Connection URI**: Replace the `mongoUri` with your MongoDB connection string.

4. **Run the Application**:
    Start the deposit tracker by running:
    ```bash
    node index.js
    ```

## Usage

Once the application is running, it will:

- Connect to the Ethereum mainnet using the provided RPC URL.
- Connect to the MongoDB database.
- Start polling the Ethereum blockchain for new blocks every 15 seconds.
- For each new block, check if there are any transactions to the beacon deposit contract.
- If a deposit is detected, it logs the transaction details and stores them in MongoDB.

### Example Output

When a deposit is detected, the following details are logged:

```
New Deposit Detected!
Block Number: 13750412
Transaction Hash: 0xabc123...
Sender Address: 0xdef456...
Amount (in Wei): 1000000000000000000
```

### MongoDB Document Structure

Each deposit record is stored in the `deposits` collection with the following structure:

```json
{
  "_id": "ObjectId",
  "blockNumber": "Number",
  "timestamp": "Number",
  "transactionHash": "String",
  "from": "String",
  "value": "String" // Amount in Wei
}
```

## Customization

- **Polling Interval**: The polling interval is currently set to 15 seconds. You can adjust it by changing the value in the `setInterval` function.
- **Contract Address**: If you want to track a different contract, replace the `beaconDepositContractAddress` variable with the desired contract address.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

@mannan-goyal
@rohilsaraf97
@bitoffabyte
@guptaharsh13
@nimishjn