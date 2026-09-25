const {test, chromium, expect} = require('@playwright/test');

    // Types to launch Applications

    // without using of any Fixture Manually we are launching the browser so we need to import chromiun at top.

// test('First type to launch playwright test', async ()=>{
    
//     const browser = await chromium.launch();
//     const context = await browser.newContext();
//     const page = await context.newPage();

//    await page.goto("https://www.flipkart.com/");
// });

     // with Browser Fixture

test('second type to launch playwright test', async ({browser})=>{
    
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://www.google.com/");
    console.log(await page.title());
    
    await expect(page).toHaveTitle("Google");
});

 // with page Fixture

// test('third type to launch  playwright test', async ({page})=>{

//     await page.goto("https://www.flipkart.com/");
// });