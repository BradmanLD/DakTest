const setupBrowser = require('./puppeteer-setup');

(async () => {
  const { browser, page } = await setupBrowser();

  try {
    // Navigate to the site
    await page.goto('http://example.com', { waitUntil: 'networkidle0' });

    // Click sidebar toggle button
    await page.click('.sidebar-toggle');

    // Check if sidebar is collapsed
    const isCollapsed = await page.evaluate(() => {
      return document.body.classList.contains('sidebar-collapse');
    });

    console.log(isCollapsed ? 'Sidebar test passed' : 'Sidebar test failed');
  } catch (error) {
    console.error('Sidebar test failed:', error.message);
  } finally {
    await browser.close();
  }
})();
