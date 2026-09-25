const {test, expect} = require('@playwright/test');

test("getByLabel locator", async({page})=>{

    test.setTimeout(6000);   // overall test time out for test level overrides locally

    const slowExpect = expect.configure({timeout: 9000}); // step level to use stored vaariable for particular step.

   await page.goto("https://rahulshettyacademy.com/angularpractice/");    //getByLabel()..methos is used when text is in Label tag in dom.

   await page.getByLabel("Check me out if you Love IceCreams!").click();     //here we can use click() or check()..both works same

    await page.getByLabel("Employed").check();

   await page.getByLabel("Gender").selectOption("Female");

   //using locator  getByPlaceholder
   
   await page.getByPlaceholder("Password").fill("abc1234");    //placeholder is used when there is Placeholder attribute in DOM take that attribute value and give in " ".

   //using locator  getByRole

   await page.getByRole("button", {name: 'Submit'}).click();     ///mosttly used ifit is buuton we can give as button else we canuse ddifferent it suggests like link etc...
 
   //using getByText()

   await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
   
   // default time out is 5sec if want to extend step level use as below we have notes in 44th section refer.

   await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({timeout: 10_000});  //step level timeout

   await page.getByRole("link", {name: 'Shop'}).click();

   await slowExpect(page.locator(".my-4").first()).toHaveText("Shop Name");     //step level timeout for Expect

   await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button", {name: 'Add '}).click();
});