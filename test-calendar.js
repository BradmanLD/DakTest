const setupBrowser = require('./puppeteer-setup');

(async () => {
  const { browser, page } = await setupBrowser();

  try {
    // Navigate to calendar page
    await page.goto('http://example.com/calendar', { waitUntil: 'networkidle0' });

    // Add a new event
    await page.click('.fc-day[data-date="2024-12-01"]');
    await page.type('#event-title', 'Meeting');
    await page.click('#save-event-button');

    // Verify event is displayed
    await page.waitForSelector('.fc-event', { timeout: 5000 });

    console.log('Calendar functionality test passed');
  } catch (error) {
    console.error('Calendar functionality test failed:', error.message);
  } finally {
    await browser.close();
  }
})();
