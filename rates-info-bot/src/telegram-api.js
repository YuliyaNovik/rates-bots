const { get, post } = require("./request");
const { EventEmitter } = require("events");
const { generateMultipartFormData } = require("./formdata");

const HOST_NAME = "api.telegram.org";
const BASE_URL = "https://" + HOST_NAME;

const createTelegramURL = (token, method, queryParams) => {
    let url = [BASE_URL, "bot" + token, method].join("/");

    if (queryParams && queryParams.size > 0) {
        url += "?" + [...queryParams.entries()].map(([key, value]) => key + "=" + value).join("&");
    }

    return url;
}

const getUpdates = async (token, offset) => {
    const method = "getUpdates";
    const params = new Map([
        ["timeout", "1"]
    ]);

    if (offset) {
        params.set("offset", offset);
    }

    const url = createTelegramURL(token, method, params);
    return await get(url);
}

const sendMessage = async (token, chatId, text, parseMode) => {
    const body = {
        chat_id: chatId,
        text: text
    }
    if (parseMode) {
        body["parse_mode"] = parseMode;
    }

    const postData = JSON.stringify(body);
    const method = "sendMessage";
    const options = {
        hostname: HOST_NAME,
        path: "/" + ["bot" + token, method].join("/"),
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Content-Length": postData.length
        }
    };

    return await post(options, postData);
}

const sendPhoto = async (token, chatId, photo) => {
    const method = "sendPhoto";
    const { boundary, body} = generateMultipartFormData(photo);

    const options = {
        hostname: HOST_NAME,
        path: "/" + ["bot" + token, method].join("/") + "?" + "chat_id=" + chatId,
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data; boundary=" + boundary,
            "Content-Length": body.length
        }
    };

    try {
        const response = await post(options, body);
        console.log(response);
        return response;
    } catch (e) {
        console.log(e);
    }
}

class TelegramBot {

    constructor(token) {
        this.token = token;
        this.messageEvent = new EventEmitter();
        this.update(undefined);
    }

    update(offset) {
        getUpdates(this.token, offset).then((response) => {
            if (response && response.ok) {
                for (const result of response.result) {
                    if (result.message) {
                        offset = result.update_id + 1;
                        this.messageEvent.emit(result.message.text, result.message);
                    }
                }
            }

            this.update(offset);
        });
    }

    onMessage(event, callback) {
        this.messageEvent.addListener(event, callback);
    }

    async sendMessage(chatId, message, parseMode) {
        return await sendMessage(this.token, chatId, message, parseMode);
    }

    async sendPhoto(chatId, photo) {
        return await sendPhoto(this.token, chatId, photo);
    }
}

module.exports = {createTelegramURL, TelegramBot};