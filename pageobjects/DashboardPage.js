class DashboardPage
{

    constructor(page)
    {
        
        this.allProducts = page.locator("div.card-body");
        this.cart = page.locator("[routerlink*='/dashboard/cart']");
        this.orders = page.locator("button[routerlink*='myorders']");

    }


    async searchProductAddCart(productName)
    {
        await this.allProducts.first().waitFor();

        console.log(await this.allProducts.allTextContents());
        const prodCount = await this.allProducts.count();

        for(let i=0; i <= prodCount; ++i)
        {
        if(await this.allProducts.nth(i).locator("b").textContent() === productName)
        {
            await this.allProducts.nth(i).locator("text= Add To Cart").click();
            break;
        }
        }

    }


    async navigateToCart()
    {
        await this.cart.click();
    }

    async navigateToOrders()
    {
    await this.orders.click();
    }


}
module.exports = {DashboardPage};