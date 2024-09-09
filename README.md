# Ethereum Deposit Tracker

## Project Overview

This project monitors and records ETH deposits on the Beacon Deposit Contract using Node.js, Alchemy RPC, and Telegram bot alerts.

## Setup Instructions

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-repo/eth-deposit-tracker.git
    cd eth-deposit-tracker
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up environment variables**:
    - Create a `.env` file in the `src/` directory and add the following:
      ```plaintext
      ALCHEMY_API_URL=YOUR_ALCHEMY_API_URL
      TELEGRAM_BOT_TOKEN=YOUR_TELEGRAM_BOT_TOKEN
      TELEGRAM_CHAT_ID=YOUR_TELEGRAM_CHAT_ID
      ```

4. **Run the application**:
    ```bash
    node src/index.js
    ```

## Features

- Monitors Ethereum Beacon Deposit Contract for incoming deposits.
- Sends Telegram alerts for each detected deposit.
- Logs deposit details and errors.

## Requirements

- Node.js
- Alchemy or Infura API key
- Telegram Bot API token

## Author
John from NexSavants
