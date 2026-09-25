const {test,expect} = require("@playwright/test");

//test.describe.configure( {mode : "parallel"}); //as per doc tests in one file will execute in serial mode this statement used to run in parallel
test.describe.configure( {mode : "serial"});  // Now tests in this file run serially one-by-one
test("PopUp validations", async({page})=>{

await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
// await page.goto("https://www.google.com/");
// await page.goBack();
// await page.goForward();

await expect(page.getByPlaceholder("Hide/Show Example")).toBeVisible();
await page.locator("#hide-textbox").click();
await expect(page.getByPlaceholder("Hide/Show Example")).toBeHidden();


//await page.pause();

//dialog or popups concept

await page.getByRole("button", {name: 'Alert'}).click();
page.on("dialog", dialog => dialog.accept());                        //dialog accept() or dismiss();
await page.getByRole("button", {name: 'Mouse Hover'}).hover();

// iframes concept

const framepage = page.frameLocator("#courses-iframe");    //framelocator()...importent to remember in frames

await framepage.locator("[href*='lifetime-access'].new-navbar-highlighter").click();
 const textvalue = await framepage.locator(".text h2").textContent();
 const value = textvalue.split(" ")[1];
 console.log(value);

});

test("Screenshots", async ({page})=>{

await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
await expect(page.getByPlaceholder("Hide/Show Example")).toBeVisible();
await page.locator("#displayed-text").screenshot({path: 'Screenshot.png'});    //screenshot for specific locator
await page.locator("#hide-textbox").click();
await page.screenshot({path: 'Screenshot2.png'});   //Screenshot for complete page
await expect(page.getByPlaceholder("Hide/Show Example")).toBeHidden();


});

test("Visual comparision", async ({page})=>{
await page.goto("https://www.google.com/");
expect(await page.screenshot()).toMatchSnapshot("landing.png");

});