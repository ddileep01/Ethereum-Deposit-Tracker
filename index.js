require("dotenv").config();
const Web3 = require("web3").default;
const { MongoClient } = require("mongodb");

// Use environment variables for configuration
const web3 = new Web3(process.env.RPC_URL);

// MongoDB connection URI from environment variables
const client = new MongoClient(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Database and collection from environment variables
const dbName = process.env.DB_NAME;
const collectionName = process.env.COLLECTION_NAME;

// Beacon Deposit Contract address from environment variables
const beaconDepositContractAddress =
  process.env.BEACON_DEPOSIT_CONTRACT_ADDRESS.toLowerCase();

// Function to start tracking deposits by polling
async function trackDepositsPolling() {
  let latestBlock = await web3.eth.getBlockNumber(); // Change 'const' to 'let'
  console.log(`Tracking deposits from block: ${latestBlock}`);

  // Connect to MongoDB
  await client.connect();
  console.log("Connected to MongoDB");

  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  setInterval(async () => {
    try {
      let currentBlock = await web3.eth.getBlockNumber(); // Change 'const' to 'let'

      // Convert block numbers to BigInt for safe comparison
      latestBlock = BigInt(latestBlock);
      currentBlock = BigInt(currentBlock);

      // Check for new blocks since the last processed block
      for (let i = latestBlock + BigInt(1); i <= currentBlock; i++) {
        console.log(`Checking block: ${i.toString()}`); // Convert BigInt to string for logging

        const block = await web3.eth.getBlock(Number(i), true); // Convert BigInt back to number for API call

        // Ensure block has transactions
        if (block.transactions && Array.isArray(block.transactions)) {
          block.transactions.forEach(async (tx) => {
            // Ensure transaction has a 'to' field
            if (tx.to) {
              console.log("New Deposit Detected!");
              console.log("Block Number:", tx.blockNumber);
              console.log("Transaction Hash:", tx.hash);
              console.log("Sender Address:", tx.from);

              // Convert BigInt to string for display or further processing
              const depositAmount = tx.value.toString(); // BigInt to string conversion
              console.log("Amount (in Wei):", depositAmount);

              // Save the deposit information to MongoDB
              await collection.insertOne({
                blockNumber: tx.blockNumber,
                timestamp: block.timestamp,
                transactionHash: tx.hash,
                from: tx.from,
                value: depositAmount,
              });
            }
          });
        }
      }
      latestBlock = currentBlock; // Update the latestBlock after checking
    } catch (error) {
      console.error("Error while tracking deposits:", error);
    }
  }, 15 * 1000); // Increase polling interval to 15 seconds
}

trackDepositsPolling();
