# Market on Block
Demo dapp with React and Solidity

## User Stories
- Sellers can create sales contracts
- Sellers can add a list of products
- Purchasers can make payments and order products.
- Each order tracks the order status.
- Payments are released from the contract automatically when purchasers set the order status as 'received'.

## app-ui folder
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

This app is ejected from create-react-app.

## SalesContract folder
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
