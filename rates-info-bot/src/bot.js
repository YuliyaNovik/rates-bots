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
        this.bot.onMessage("/rates", this.sendRates.bind(this));
        this.bot.onMessage("/average", this.sendCurrencyList.bind(this));
        this.bot.onInlineCallback(this.sendCurrencyCallback.bind(this));
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

    async sendCurrencyCallback(callbackQuery) {
        const currency = callbackQuery.data;
        const message = callbackQuery.message;
        const chatId = message.chat.id;
        await this.bot.answerCallbackQuery(chatId, callbackQuery.id);
        await this.sendImage(chatId);
    }

    async sendImage(chatId) {
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
    async sendCurrencyList(message) {
        const rates = await getRates();
        const currencies = rates.map((rate) => {
            return rate.currency.abbreviation;
        });

        await this.sendInlineCurrencyKeyboard(message.chat.id, currencies);
    }

    async sendInlineCurrencyKeyboard(chatId, names) {
        try {
            const rowLength = 4;
            const buttons = [];
            for (let i = 0; i < names.length; i+= rowLength) {
                buttons.push(names.slice(i, i + rowLength));
            }

            await this.bot.sendInlineKeyboard(chatId, buttons);
        } catch (error) {
            await this.bot.sendMessage(
                chatId,
                "Some error occurred, try again later"
            );
        }
    }
}

module.exports = { RatesInfoBot };
