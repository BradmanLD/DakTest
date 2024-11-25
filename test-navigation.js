const setupBrowser = require('./puppeteer-setup');

(async () => {
  const { browser, page } = await setupBrowser();

  try {
    // Navigate to the site
    await page.goto('http://example.com', { waitUntil: 'networkidle0' });

    // Click a navigation menu item
    await page.click('a[href="/dashboards"]');

    // Verify dashboard page loaded
    await page.waitForSelector('#dashboard-title', { timeout: 5000 });

    console.log('Navigation menu test passed');
  } catch (error) {
    console.error('Navigation menu test failed:', error.message);
  } finally {
    await browser.close();
  }
})();
