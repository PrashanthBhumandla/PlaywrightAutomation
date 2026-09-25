const {expect} = require("@playwright/test");

class CartPage
{
    constructor(page)
    {
        this.page = page;
        this.checkoutbutton = page.locator("text=Checkout");
        
    }

    async VerifyProductIsDisplayed(productName)
    {
        
        await this.page.locator("div ul").first().waitFor();      
        const bool =  await this.page.locator("h3:has-text('"+productName+"')").isVisible();
        expect(bool).toBeTruthy();

    }

    async navigateToCheckout()
    {
        await this.checkoutbutton.click();
    }
}
module.exports={CartPage};