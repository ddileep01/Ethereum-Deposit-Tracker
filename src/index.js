const { trackDeposits } = require('./services/ethTracker.js');
const logger = require('./utils/logger');
const { JsonRpcProvider, ethers } = require('ethers'); 
console.log(ethers); // Check if ethers is imported correctly
console.log(ethers.JsonRpcProvider); // Check if JsonRpcProvider exists
console.log("trackDeposits:::",trackDeposits)

async function startApp() {
    try {
        logger.info('Starting Ethereum Deposit Tracker...');
        await trackDeposits();
    } catch (error) {
        logger.error(`Failed to start tracker: ${error.message}`);
    }
}

startApp();
