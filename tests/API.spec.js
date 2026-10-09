const {test,expect,request} = require("@playwright/test")

test('GET Practice', async({request})=> {

    const response = await request.get("https://api.qaautomationlabs.com/v1/carts?page=1&limit=10")

    expect(response.status()).toBe(200)

});

test.only('Post request', async ({request})=>{
    const response = await request.post("https://api.qaautomationlabs.com/v1/carts",{
        data: {
  "customerId": 7,
  "items": [
    {
      "productId": 3,
      "quantity": 1
    }
  ]
}
})
expect(response.status()).toBe(201)
    
});

//   https://api.qaautomationlabs.com/
