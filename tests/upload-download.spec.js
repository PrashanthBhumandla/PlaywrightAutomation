const ExcelJs = require('exceljs');
const { test, expect } = require('@playwright/test');

// const Exceljs = require('exceljs');
// const test = require('node:test');
// const {test, expect} = require('@playwright/test');



async function writeexcelTest(searchText,replaceText,change,filepath)
{
    
const workbook = new ExcelJs.Workbook();
await workbook.xlsx.readFile(filepath);
const worksheet = workbook.getWorksheet('Sheet1');
const outPut = await readexcelTest(worksheet,searchText);

const cell = worksheet.getCell(outPut.row,outPut.column+change.colChange);
cell.value= replaceText;
await workbook.xlsx.writeFile(filepath);

}

async function readexcelTest(worksheet,searchText) {


    let outPut = {row:1, column:1};

worksheet.eachRow((row, rowNumber) =>
{
      row.eachCell((cell, columnNumber) =>
    {
        if(cell.value === searchText)
        {
            outPut.row=rowNumber;
            outPut.column=columnNumber;
            
        }
    });
})
   return outPut; 
}
//writeexcelTest("Banana",350,{rowChange:0,colChange:2},"C:/Users/Prasanth Bhumandla/Downloads/download.xlsx");

test("upload downlod by playwright", async ({page})=>{
    const updateValue='350';
    await page.goto("https://rahulshettyacademy.com/upload-download-test/");
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole("button",{name: "Download"}).click();
    await downloadPromise;
    writeexcelTest("Banana",updateValue,{rowChange:0,colChange:2},"C:/Users/Prasanth Bhumandla/Downloads/download.xlsx");
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles("C:/Users/Prasanth Bhumandla/Downloads/download.xlsx");  //setInputFiles()..method works only if the locator type="file" in dom.
    const searchText = await page.getByText("Banana");
    const desiredRow = await page.locator(".sc-jsEeTM").filter({has: searchText});

    // expect(await desiredRow.locator("#cell-4-undefined").textContent()).toBe(updateValue);

   await expect( desiredRow.locator("#cell-4-undefined")).toContainText(updateValue);
});