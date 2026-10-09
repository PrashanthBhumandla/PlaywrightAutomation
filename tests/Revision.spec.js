const {test,expect} = require("@playwright/test")


test('revison for concept', async ({page})=>{

    await page.goto("https://qaplayground.com/practice/input-fields")
    await page.getByPlaceholder("Enter a movie name…").fill("The Paradise")
    await page.getByRole("button",{name: "Submit"}).click()

    const name = await page.locator("#result-s01").textContent();

    expect(name).toContain("The Paradise");

    const append = page.locator("input#appendInput")
    await append.clear()
   // await page.pause()
    await append.fill("Prashanth")

    const value =await page.locator("input#readValueInput").inputValue()
    console.log(value)

    await page.locator("input#clearInput").clear()
    
    expect(page.locator("input[data-testid='input-disabled']")).toBeDisabled();

   const readingValue =  await page.locator("#readonlyInput").inputValue();
   console.log(readingValue)
})

test.only("2nd page",async ({page})=>{

    await page.goto("https://qaplayground.com/practice/buttons")
    await page.locator("#navigateHomeBtn").click()

    await page.getByTestId("btn-get-coordinates").click()
   const result = await page.locator("#colorBtn").evaluate((element)=>{

        return getComputedStyle(element).backgroundColor;
    })
 console.log(result)

 const result1 =await page.locator("#sizeBtn").evaluate((element)=>{
    return{
        height:  getComputedStyle(element).height ,
        width: getComputedStyle(element).width
    }
    
 })
 console.log(result1)

})