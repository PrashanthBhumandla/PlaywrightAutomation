Feature: Ecommerce validations

@Regression
Scenario: placing the order
Given login to Ecommerce application with "prashanthbhumandla@gmail.com" and "216143252@Bp"
When Add "ZARA COAT 3" to cart
Then verify "ZARA COAT 3" is displayed in the cart
When Enter valid details and place the order
Then verify order is present in the OrderHistory

