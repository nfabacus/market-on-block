# Shop on the Block
Demo dapp with React and Solidity

Simple online shop concept on Ethereum blockchain

## User Stories
- Sellers can create sales contracts
    - Only one seller at the moment :white_check_mark:
- Sellers can add a list of products :white_check_mark:
- Purchasers can make payments and order products. :white_check_mark:
- Each order tracks the order status. :white_check_mark:
- Payments are released from the contract automatically when purchasers set the order status as 'received'. :white_check_mark:

## Future Stories and ToDos
- Events not working for auto-updating the data on ui - to be fixed.
- Seller can delete products.
- Refactoring app-ui
  - Maybe add Redux
- User's physical address should not be recorded to the blockchain for privacy reasons, so maybe store it in a normal database (e.g. mongoDB) accessible by authenticated server.

## Structure
### app-ui folder
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

This app is ejected from create-react-app.

### SalesContract folder
This section was bootstrapped with Truffle init.
It contains a Smart Contract (SalesContract.sol) under the contracts folder.

## Setup
- Install Truffle globally.
```npm install -g truffle```
- You will need Chrome with Metamask installed.
- Clone this repo
- npm install from the app-ui 

## How to spin
- Run the Truffle development console in your terminal. ```truffle develop```
- ```compile```
- ```migrate```
- Open another terminal and ```npm run start``` from the app-ui folder.
