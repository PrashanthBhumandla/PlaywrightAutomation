const {test,expect} = require("@playwright/test");

test("Client App Login",async({page})=>{

   const  productName="ZARA COAT 3";
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const userName = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const loginBtn = page.locator("#login");
    const allProducts = page.locator("div.card-body");

    await userName.fill("prashanthbhumandla@gmail.com");
    await password.fill("216143252@Bp");
    await loginBtn.click();
    
    await allProducts.first().waitFor();   //waits for all products to visible else it will return 0 value
    
    console.log(await allProducts.allTextContents());

    const prodCount = await allProducts.count();

    for(let i=0; i <= prodCount; ++i)
    {
      if(await allProducts.nth(i).locator("b").textContent() === productName)
      {
         await allProducts.nth(i).locator("text= Add To Cart").click();
         break;
      }
    }
    
    await page.locator("[routerlink*='/dashboard/cart']").click();

    await page.locator("div ul").first().waitFor();

   const bool =  await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
   expect(bool).toBeTruthy();

   await page.locator("text=Checkout").click();



   await page.locator("[placeholder*='Country']").pressSequentially("ind"); //pressSequentially method will enter data letter by letter
   const dropDown = page.locator(".ta-results");

   await dropDown.waitFor();
   const Count = await dropDown.locator("button").count();

   console.log(Count);

   for(let i=0; i<Count; ++i)
   {
     const text = await dropDown.locator("button").nth(i).textContent();

     if(text===" India")
     {

        await dropDown.locator("button").nth(i).click();
        break;
     }
     
   }
   expect(page.locator("label[type='text']")).toHaveText("prashanthbhumandla@gmail.com");
   await page.locator(".action__submit").click();

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