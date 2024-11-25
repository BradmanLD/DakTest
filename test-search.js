const setupBrowser = require('./puppeteer-setup');

(async () => {
  const { browser, page } = await setupBrowser();

  try {
    // Navigate to the site
    await page.goto('http://example.com', { waitUntil: 'networkidle0' });

    // Enter a search query
    await page.type('#sidebar-search', 'equipment');

    // Simulate Enter key press
    await page.keyboard.press('Enter');

    // Wait for search results
    await page.waitForSelector('#search-results', { timeout: 5000 });

    console.log('Search functionality test passed');
  } catch (error) {
    console.error('Search functionality test failed:', error.message);
  } finally {
    await browser.close();
  }
})();
