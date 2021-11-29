const { HtmlFormatter } = require("../../../src/formatter/html-formatter");

describe("Test HTML Formatter module", () => {
    it("should return parseMode", async () => {
        const actualResult = new HtmlFormatter().parseMode;
        expect(actualResult).toEqual("HTML")
    })

    it("should put text into tag <b>", async () => {
        const text = "some text";

        const actualResult = new HtmlFormatter().getBold(text);
        expect(actualResult).toEqual("<b>some text</b>")
    })

    it("should put text into tag <i>", async () => {
        const text = "some text";

        const actualResult = new HtmlFormatter().getItalic(text);
        expect(actualResult).toEqual("<i>some text</i>")
    })

    it("should create url", async () => {
        const urlName = "link";
        const link = "https://jestjs.io/";
        const actualResult = new HtmlFormatter().getURL(urlName, link);
        expect(actualResult).toEqual("<a href=\"https://jestjs.io/\">link</a>")
    })
})