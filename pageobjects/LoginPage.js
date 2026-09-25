class LoginPage{

    constructor(page)
    {
        this.page = page;
        this.userName = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.signInbutton = page.locator("#login");

    }
    async goTo()
    {
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    }

    async validLogin(username,passwd)
    {
        await this.userName.fill(username);
        await this.password.fill(passwd);
        await this.signInbutton.click();

    }
}
module.exports = {LoginPage};