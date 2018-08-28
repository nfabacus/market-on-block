import web3 from './web3';
import SalesContract from '../../../SalesContract/build/contracts/SalesContract.json'

const contract = require('truffle-contract');

const salesContract = contract(SalesContract);
salesContract.setProvider(web3.currentProvider);
const contractPromise = salesContract.deployed();

export default contractPromise;