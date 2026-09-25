const {test,expect,dialog} = require('@playwright/test');
const data = JSON.parse(JSON.stringify(require('../utils/practiceData1.json')));

//const dataset = JSON.parse(JSON.stringify(require('../utils/placeorderTestData.json'))); 


test('flipkart login', async ({page})=>{

   await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const user = page.getByPlaceholder("email@example.com");
    const psd = page.getByPlaceholder("enter your passsword");
   const button =  page.getByRole("button", {name: "Login"});

   await user.fill(data.userN);
   await psd.fill(data.passw);
    await button.click();

    

    const productsAll = page.locator("#products div[class=row] .col-lg-4");
    const addtocart = productsAll.filter({hasText: 'ADIDAS ORIGINAL'}).getByRole("button",{name:' Add To Cart'});
    await  addtocart.click();

    await page.pause();
    await page.locator("button[routerlink='/dashboard/cart']").click()

    const cartProducts =await page.locator(".cartWrap ");
    console.log(cartProducts)
    const buynow = cartProducts.filter({hasText: 'ADIDAS ORIGINAL'}).getByRole('button', {name: 'Buy Now'});
    await buynow.click();


});

test.only('dropdown',async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator("#username").fill("rahulshettyacademy ");
    await page.locator("#password").fill("Learning@830$3mK2");

    //page.on('dialog', dialog => dialog.accept());

    //page.on("dialog", dialog => dialog.accept()); 

    await page.locator(".customradio").filter({hasText: ' User'}).click();

    //page.on("dialog", dialog => dialog.accept()); 

    await page.selectOption("select.form-control",'Teacher');

    await page.locator("#terms").check();

    await page.locator("#signInBtn").click();
})

