const puppeteer = require('puppeteer');

async function setupBrowser() {
  const browser = await puppeteer.launch({ headless: true }); // Set to false for debugging
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  return { browser, page };
}

module.exports = setupBrowser;
