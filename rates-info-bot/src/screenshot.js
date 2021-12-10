const puppeteer = require("puppeteer");

const makeScreenshot = async (url, selector) => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto(url);
  await page.waitForSelector(selector, {timeout: process.env.TIMEOUT});
  const chart = await page.$(selector);
  const screenshot = await chart.screenshot({ });

  await browser.close();
  return screenshot;
};

module.exports = { makeScreenshot };
