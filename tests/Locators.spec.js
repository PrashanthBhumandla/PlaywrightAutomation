const {test,chromium, expect} = require('playwright/test');

test("Locators & loginPage practice", async ({page})=>{

    const userName = page.locator("#username");
    const submitBtn = page.locator("input[type='submit']");
    const cartTitles = page.locator(".card-title a");

   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await userName.fill("Prashanth");
    await page.locator("input[type='password']").fill("Learning@830$3mK2");
    await submitBtn.click();

    //doing assertion

    console.log(await page.locator("div[style*='display']").textContent());
    expect(page.locator("div[style*='display']")).toContainText("Incorrect");

    //eraising wrong data and give new corresct data

    await userName.fill("");    //if we give empty space as shown it will erase the content 
    await userName.fill("rahulshettyacademy");
    await submitBtn.click();

    // console.log(await cartTitles.first().textContent());
    // console.log(await cartTitles.nth(1).textContent());

   //await page.waitForLoadState('networkidle');  //-- This method may work maynot because play document says its an flaky.
    
   await cartTitles.first().waitFor();   // for alternate we use this to wait for all elements

    console.log(await cartTitles.allTextContents());  //here we are getting empty array because it is not waiting until page load.


});

test("select droup down and radio button", async({page})=>{

    const dropDown = page.locator("select.form-control");
    const documentLink = page.locator("[href*='documents-request']");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

   await dropDown.selectOption("consult");

   await page.locator(".customradio [value='user']").click();
   await page.locator("#okayBtn").click();

   expect(await page.locator(".customradio [value='user']")).toBeChecked();  // this method is used to check this will fail if not checked
   console.log(await page.locator(".customradio [value='user']").isChecked());   // returns true or false
   
   await page.locator("#terms").check();
   expect(await page.locator("#terms")).toBeChecked();

   await page.locator("#terms").uncheck();
   expect(await page.locator("#terms").isChecked()).toBeFalsy();

  await expect(documentLink).toHaveAttribute('class','blinkingText');  //blinktext is a class from html this gives developer to blink the text

   await page.pause();


});

test.only("child window handling & switching tabs", async({browser})=>{

    

    const context = await browser.newContext();
    const page = await context.newPage();
   const userName = page.locator("#username");
    const documentLink = page.locator("[href*='documents-request']");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    
  const [newPage] = await Promise.all([     //promise.all() method is used to run two statments parallelly

    
     context.waitForEvent('page'),     //listen for any new page is pending,fulfillor rejected
     documentLink.click()          //new page will open

    ]);

  const text = await newPage.locator("p.red").textContent();
  const arrayText = text.split("@");
  const domain = arrayText[1].split(" ")[0];

  console.log(domain);

  //here we need to give some text in username for page one 

  await userName.fill(domain);

  console.log(await userName.inputValue());   //inputvalue()..method will gives the text which we texted.
 

});