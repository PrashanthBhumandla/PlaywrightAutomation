const {expect} = require('@playwright/test');
const {POManager} = require('../../pageobjects/POManager');
const {When, Then, Given} = require("@cucumber/cucumber");
const playwright = require('@playwright/test');


Given('login to Ecommerce application with {string} and {string}',{timeout: 100*1000}, async function (username, password) {
  
    
     const products = this.page.locator(".card-body");
     const loginPage = this.poManager.getLoginPage();
     await loginPage.goTo();
     await loginPage.validLogin(username,password);
});

When('Add {string} to cart', async function (productName) {
  
     this.dashboardPage= this.poManager.getDashboardPage();
     await this.dashboardPage.searchProductAddCart(productName);
     await this.dashboardPage.navigateToCart();
  
});

Then('verify {string} is displayed in the cart', async function (productName) {
  
  const cartPage = this.poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.navigateToCheckout();
});

When('Enter valid details and place the order',async function () {

 const ordersReviewPage = this.poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind","India");
    this.orderId = await ordersReviewPage.SubmitAndGetOrderId();
   console.log(this.orderId);
   
});

Then('verify order is present in the OrderHistory',async function () {

  await this.dashboardPage.navigateToOrders();
   const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
   await ordersHistoryPage.searchOrderAndSelect(this.orderId);
   expect(this.orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});

// this is for Errorvalidation.feature

Given('login to application with {string} and {string}', async function (Name, Pass) {

    const userName = this.page.locator("#username");
    const submitBtn = this.page.locator("input[type='submit']");

    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await userName.fill(Name);
    await this.page.locator("input[type='password']").fill(Pass);
    await submitBtn.click();

});

Then('verify Credentials are valid or not', async function () {
  //doing assertion
    console.log(await this.page.locator("div[style*='display']").textContent());
    expect(this.page.locator("div[style*='display']")).toContainText("Incorrect");
});
