// const { ethers } = require('ethers'); //v5
const { JsonRpcProvider, ethers } = require('ethers'); //v6
const logger = require('../utils/logger');
const { rpcUrl, beaconDepositContract } = require('../config/config');
const { sendTelegramAlert } = require('./telegramBot');
console.log("PROVIERS:::", ethers)
console.log("********",ethers); // Check if ethers is imported correctly
console.log("#####",ethers.JsonRpcProvider); // Check if JsonRpcProvider exists
// const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
const provider = new ethers.JsonRpcProvider(rpcUrl);
console.log("latest prov::", provider)

async function trackDeposits() {
    console.log("getting into fnc")
    const latestBlock = await provider.getBlockNumber();

    provider.on("block", async (blockNumber) => {
        console.log("blockNumber:::",blockNumber)
        if (blockNumber > latestBlock) {
            const block = await provider.getBlockWithTransactions(blockNumber);

            block.transactions.forEach(tx => {
                if (tx.to && tx.to.toLowerCase() === beaconDepositContract.toLowerCase()) {
                    const depositDetails = `
                        Deposit detected:
                        - Tx Hash: ${tx.hash}
                        - From: ${tx.from}
                        - Value: ${ethers.utils.formatEther(tx.value)} ETH
                        - Block: ${blockNumber}
                    `;
                    logger.info(depositDetails);
                    sendTelegramAlert(depositDetails);
                }
            });
        }
    });
}

module.exports = trackDeposits;
