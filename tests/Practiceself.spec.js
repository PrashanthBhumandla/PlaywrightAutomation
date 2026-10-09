const {test,expect} = require("@playwright/test")

test("E2E E-Commerce Application", async({page}) => {

    await page.goto("https://rahulshettyacademy.com/client")
    await page.locator("#userEmail").fill("prashanthbhumandla@gmail.com")
    await page.getByPlaceholder("enter your passsword").fill("216143252@Bp")
    await page.locator("input[class='btn btn-block login-btn']").click()

    const list = page.locator(".row .ng-star-inserted .card")
    await list.first().waitFor();
    const listCount = await  list.count()
    console.log(listCount)

    const listNames = await list.allInnerTexts()
    console.log(listNames)

      for(let i=0; i<=listCount; i++)
      {
        if(await list.nth(i).locator("b").innerText() == "IPHONE 13 PRO")
        {
            await list.nth(i).getByRole('button',{name: ' Add To Cart'}).click()
            break;
        }
        
      }
      await page.locator(".btn-custom .fa-shopping-cart").click()

      // Cart Page

      await page.locator(".cartWrap").filter({hasText: 'iphone 13 pro'}).getByRole('button', {name: 'Buy Now'}).click()

      await page.getByPlaceholder("Select Country").pressSequentially("Ind")
      const dropdownOptions =  page.locator(".ta-results")
      await dropdownOptions.first().waitFor();
      await dropdownOptions.getByText(" India").last().click()

      await page.locator(".action__submit").click()

      //After placing order Thankyou Page

      const Thank = await page.locator(".hero-primary").textContent()
      expect(Thank).toBe(" Thankyou for the order. ")
      
      
      

      


   await page.pause()
    
})
