class HtmlFormatter {
    constructor() {
    }

    get parseMode() {
        return "HTML";
    }

    getBold(text) {
        return `<b>${text}</b>`;
    }

    getItalic(text) {
        return `<i>${text}</i>`;
    }

    getURL(text, link) {
        return `<a href="${link}">${text}</a>`;
    }

    getCode(text) {
        return `<code>${text}</code>`;
    }
}

module.exports = { HtmlFormatter };