const setupBrowser = require('./puppeteer-setup');

(async () => {
  const { browser, page } = await setupBrowser();

  try {
    // Navigate to login page
    await page.goto('http://example.com/login', { waitUntil: 'networkidle0' });

    // Fill login form
    await page.type('#username', 'validUsername');
    await page.type('#password', 'validPassword');

    // Click login
    await page.click('#login-button');

    // Wait for dashboard to load
    await page.waitForSelector('#dashboard', { timeout: 5000 });

    console.log('Login test passed');
  } catch (error) {
    console.error('Login test failed:', error.message);
  } finally {
    await browser.close();
  }
})();
