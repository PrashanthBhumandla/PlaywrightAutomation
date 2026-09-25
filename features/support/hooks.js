const playwright = require('@playwright/test');
const {POManager} = require('../../pageobjects/POManager');
const {Before, AfterStep, Status, After} = require('@cucumber/cucumber');

Before( async function(){

    const browser = await playwright.chromium.launch({headless: false});
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager = new POManager(this.page);
});

AfterStep(async function({result}){

if(result.status == Status.FAILED){
    await this.page.screenshot({path: 'screenshot145.png'});
}
});

After( async function(){

    console.log("im last person to execute")
});