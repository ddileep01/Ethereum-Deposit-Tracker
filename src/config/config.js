require('dotenv').config();

module.exports = {
    rpcUrl: process.env.ALCHEMY_API_URL,
    telegramBotToken: process.env.TELEGRAM_BOT_TOKEN,
    telegramChatId: process.env.TELEGRAM_CHAT_ID,
    beaconDepositContract: "0x00000000219ab540356cBB839Cbe05303d7705Fa"
};
