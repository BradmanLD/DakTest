const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false, // Set to true if you don't want to see the browser
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();

  // Set the page viewport for better visibility
  await page.setViewport({ width: 1280, height: 800 });

  try {
    // Navigate to the login page
    await page.goto('https://demo.daktech.au/', { waitUntil: 'networkidle2' });
    
    // Wait for the username field to load and input the username
    await page.waitForSelector('#username', { visible: true });
    await page.type('#username', 'DakTesting');

    await page.waitForSelector('button[type="submit"]'); // Adjust selector if necessary
    await page.click('button[type="submit"]');

    // Wait for the password field to load and input the password
    await page.waitForSelector('#password', { visible: true });
    await page.type('#password', 'Test!ng001');
    
    // Click the login button
    await page.waitForSelector('button[type="submit"]'); // Adjust selector if necessary
    await page.click('button[type="submit"]');

    console.log('Login successful!');
    // Wait for navigation after login
    await page.waitForNavigation({ waitUntil: 'networkidle2' });


  } catch (error) {
    console.error('Error during login:', error);
  } 

  // Example 1: Interact with the sidebar menu
  console.log('Clicking the CRM menu...');
  await page.waitForSelector('a.nav-filter-select[data-target="nav-crm"]', { visible: true });
  await page.click('a.nav-filter-select[data-target="nav-crm"]');
  await page.waitForSelector('.nav-crm', { visible: true }); // Wait for CRM content to load

  // Example 2: Search in the sidebar
  console.log('Searching for "Templates"...');
  await page.waitForSelector('#sidebar-search', { visible: true });
  await page.type('#sidebar-search', 'Templates');
  await page.waitForSelector('#search-results .search-result-button', { visible: true }); // Wait for search results to appear
  const searchResults = await page.$$('#search-results .search-result-button');
  if (searchResults.length > 0) {
      console.log('Clicking the first search result...');
      await searchResults[0].click();
  } else {
      console.log('No search results found.');
  }

  // // Example 3: Expand a collapsed card (e.g., "User Documents")
  // console.log('Expanding the "User Documents" section...');
  // await page.waitForSelector(
  //     'card-header bg-settings',
  //     { visible: true }
  // );
  // await page.click(
  //     'card-header bg-settings'
  // );
  
  
  //await page.waitForSelector('div.card-body:has(table)', { visible: true }); // Wait for the card content to expand

  // // Example 4: Click the "Add Document" button
  // console.log('Clicking the "Add Document" button...');
  // await page.waitForSelector('a[href="/user-docs/add/232"]', { visible: true });
  // await page.click('a[href="/user-docs/add/232"]');
  // await page.waitForNavigation({ waitUntil: 'networkidle2' }); // Wait for navigation after clicking

  // Example 6: Open profile view
  console.log('Clicking the Profile icon...');
  await page.waitForSelector('a[data-widget="control-sidebar"]', { visible: true });
  await page.click('a[data-widget="control-sidebar"]');
  await page.waitForSelector('aside.control-sidebar', { visible: true }); // Wait for the profile sidebar to open

  // Example 7: Log out
  console.log('Logging out...');
  await page.waitForSelector(('aside.control-sidebar ::-p-text(Sign out)'), { visible: true });
  console.log("Happening")

  await page.click(('aside.control-sidebar ::-p-text(Sign out)'));
  await page.waitForNavigation({ waitUntil: 'networkidle2' }); // Wait for logout to complete

  console.log('Test script completed.');
})();
