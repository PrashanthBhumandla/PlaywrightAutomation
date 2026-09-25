const {test,expect} = require("@playwright/test");
const {LoginPage} = require("./pageobjects/LoginPage");
const {DashboardPage} = require("./pageobjects/DashboardPage");
const {CartPage} = require("./pageobjects/CartPage");
const {CheckOutPage} = require("./pageobjects/CheckOutPage");


test("Client App Login",async({page})=>{

    const productName="ZARA COAT 3";
    const username = "prashanthbhumandla@gmail.com";
    const passwd = "216143252@Bp";

    const loginPage = new LoginPage(page);          // complete LoginPage steps
    await loginPage.goTo();
    await loginPage.validLogin(username,passwd);
    
    
   const dashboardPage = new DashboardPage(page);     //complete DashboardPage steps
   await dashboardPage.searchProduct(productName);
   await dashboardPage.navigateToCart();
    

   const cartPage = new CartPage(page);               //complete CartPage steps
   await cartPage.selectedproductVisiblecheck();
   await cartPage.navigateToCheckout();

   const checkOutPage = new CheckOutPage(page);        //complete CheckOutPage or OrderReviewPage steps
   await checkOutPage.dynamicDropdownselect(username);
   await checkOutPage.navigateToPlaceorder();

   
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   const id = await page.locator("label.ng-star-inserted").textContent();
   console.log(id);

   //now going for orders page

  await page.locator("button[routerlink*='myorders']").click();

  await page.locator("tbody").waitFor();

  const rows = await page.locator("tbody tr");
  const rowcount = await rows.count();

  for(let i=0; i<=rowcount; ++i)
  {
   const orderid = await rows.nth(i).locator("th").textContent();

   if(id.includes(orderid))
   {
    await rows.nth(i).locator("button.btn-primary").click();
    break;
   }
  }
  const finalid = await page.locator("div.col-text ").textContent();
  expect(id.includes(finalid)).toBeTruthy();
   
   await page.pause();
});