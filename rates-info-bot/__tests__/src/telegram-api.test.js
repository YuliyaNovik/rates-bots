const { createTelegramURL } = require("../../src/telegram-api");

describe("Test telegram API module", () => {
    it("should create simple URL", async () => {
        const method = "getUpdates";
        const token = "TOKEN_VALUE";
        const params = new Map([]);

        const actualResult = createTelegramURL(token, method, params);
        expect(actualResult).toEqual("https://api.telegram.org/botTOKEN_VALUE/getUpdates");
    });

    it("should create URL with query params", async () => {
        const method = "getUpdates";
        const token = "TOKEN_VALUE";
        const params = new Map([
            ["timeout", "1"],
            ["offset", 12345678]
        ]);

        const actualResult = createTelegramURL(token, method, params);
        expect(actualResult).toEqual("https://api.telegram.org/botTOKEN_VALUE/getUpdates?timeout=1&offset=12345678");
    });
});