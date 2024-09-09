const axios = require('axios');
const { telegramBotToken, telegramChatId } = require('../config/config');
const logger = require('../utils/logger');

async function sendTelegramAlert(message) {
    try {
        const url = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;
        await axios.post(url, {
            chat_id: telegramChatId,
            text: message
        });
        logger.info(`Telegram alert sent: ${message}`);
    } catch (error) {
        logger.error(`Failed to send Telegram alert: ${error.message}`);
    }
}

module.exports = { sendTelegramAlert };
