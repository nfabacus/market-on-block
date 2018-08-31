import React, { Component } from 'react'
import ProductEntryForm from '../Form/ProductEntryForm'
import web3 from '../../ethereum/web3';
import salesContract from '../../ethereum/SalesContract';

class Admin extends Component {

  async componentDidMount(){
    window.scrollTo(0,0)
    this.contractInstance = await salesContract;
    console.log('contactInstance>>>', this.contractInstance)
  }

  handleSubmit = async ({ productId, productDescription, unitPrice, availableQty }) => {
    const accounts = await web3.eth.getAccounts()
    console.log(productId, productDescription, unitPrice, availableQty)
    console.log('accounts>>', accounts)
    try {
      await this.contractInstance.addProduct(productId, productDescription, unitPrice, availableQty, { from: accounts[0] })
    } catch(err) {
      console.log(err);
    }
  }

  render() {
    return (
      <section>
        <section className="container-fluid block-row bg-contact">
          <div className="container">
            <div className="title-area">
              <h1 className="display-4">Admin</h1>
            </div>
          </div>
        </section>
        <section className="container-fluid block-row">
          <div className="container">
            <h2>Add a product</h2>
            <ProductEntryForm handleProductSubmit={this.handleSubmit} />
          </div>
        </section>
      </section>
    )
  }
}

export default Admin