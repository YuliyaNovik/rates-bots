const { TelegramBot } = require("./telegram-api");
const { getCurrenciesOnDate } = require("./nbrb/nbrb");
const { HtmlFormatter } = require("./formatter/html-formatter");
const { createRatesMessage } = require("./formatter/rates-formatter");
const { readFile } = require("fs/promises");
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
        this.bot.onMessage("/start", this.sendRates.bind(this));
        this.bot.onMessage("/average", this.sendImage.bind(this));
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

    async sendImage(message) {
        const chatId = message.chat.id;
        await this.bot.sendMessage(chatId, "Please wait a few seconds");
        try {
            const path = "1.jpeg";
            const screenshot = await readFile(path);
            await this.bot.sendPhoto(chatId, screenshot);
        } catch (error) {
            await this.bot.sendMessage(
                chatId,
                "Some error occurred, try again later"
            );
        }
    }
}

module.exports = { RatesInfoBot };
