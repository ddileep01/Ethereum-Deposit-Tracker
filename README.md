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

3. **Create a `.env` File**:
    Create a `.env` file in the root directory of your project to store your environment variables. Add the following variables to the file:
    ```plaintext
    RPC_URL=https://eth-mainnet.g.alchemy.com/v2/JbXuCBw3BnlvxeNmY_2UcP8p-pW7t0BI
    MONGO_URI=mongodb+srv://haribabu91000:B5xKdd3SdxLDACB6@cluster0.wkdhl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
    DB_NAME=ethDeposits
    COLLECTION_NAME=deposits
    BEACON_DEPOSIT_CONTRACT_ADDRESS=0x00000000219ab540356cBB839Cbe05303d7705Fa
    ```

    This `.env` file is used to securely manage sensitive information such as your RPC URL, MongoDB connection string, database name, collection name, and the beacon deposit contract address.

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
- **Contract Address**: If you want to track a different contract, replace the `BEACON_DEPOSIT_CONTRACT_ADDRESS` variable in the `.env` file with the desired contract address.

## Using GitHub Actions Secrets

If you're deploying this project using GitHub Actions, you should store your sensitive information as [GitHub Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets). Here's how to set it up:

1. **Add Secrets to GitHub**:
    - Go to your GitHub repository.
    - Navigate to **Settings** > **Secrets and variables** > **Actions** > **New repository secret**.
    - Add the following secrets:
        - `RPC_URL`
        - `MONGO_URI`
        - `DB_NAME`
        - `COLLECTION_NAME`
        - `BEACON_DEPOSIT_CONTRACT_ADDRESS`

2. **Use Secrets in GitHub Actions**:
    In your GitHub Actions workflow file, access these secrets using `secrets.<SECRET_NAME>`. Example:
    ```yaml
    env:
      RPC_URL: ${{ secrets.RPC_URL }}
      MONGO_URI: ${{ secrets.MONGO_URI }}
      DB_NAME: ${{ secrets.DB_NAME }}
      COLLECTION_NAME: ${{ secrets.COLLECTION_NAME }}
      BEACON_DEPOSIT_CONTRACT_ADDRESS: ${{ secrets.BEACON_DEPOSIT_CONTRACT_ADDRESS }}
    ```

## Results

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.