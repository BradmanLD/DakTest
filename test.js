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

        // Wait for navigation after login
        await page.waitForNavigation({ waitUntil: 'networkidle2' });

        console.log('Login successful!');
		
		// Save Auth Cookie (Help)
		// const cookies = await page.cookies();
		// const authTokenCookie = cookies.find((cookie) => cookie.name === 'crsfToken'); // Replace 'authToken' with actual cookie name
		// console.log("Saved")
		// 
		// console.log('Auth Token:', authTokenCookie);
		// const fs = require('fs');
		// fs.writeFileSync('authToken.txt', authTokenCookie);
	
		
		
    } catch (error) {
        console.error('Error during login:', error);
    } finally {
        // Close the browser
    }
})();
