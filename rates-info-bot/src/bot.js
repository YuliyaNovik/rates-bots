const { TelegramBot } = require("./telegram-api");
const { getCurrenciesOnDate } = require("./nbrb/nbrb");
const { HtmlFormatter } = require("./formatter/html-formatter");
const { createRatesMessage } = require("./formatter/rates-formatter");
const token = process.env.TOKEN;

const getRates = async () => {
    try {
        const date = new Date();
        return await getCurrenciesOnDate(date);
    } catch (error) {
        console.log(error);
    }
}

class RatesInfoBot {
    constructor() {
        this.bot = new TelegramBot(token);
        this.bot.onMessage(this.sendRates.bind(this));
    }

    async sendRates(message) {
        const chatId = message.chat.id;
        const rates = await getRates();
        const formatter = new HtmlFormatter();
        const ratesMessage = createRatesMessage(rates,"BYN", formatter);
        const result = await this.bot.sendMessage(chatId, ratesMessage, formatter.parseMode);

        if (!result.ok) {
            console.log(result);
        }
    }
}

module.exports = { RatesInfoBot };
