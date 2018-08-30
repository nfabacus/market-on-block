import React, { Component } from 'react'

import web3 from '../../ethereum/web3';
import salesContract from '../../ethereum/SalesContract';

class Products extends Component {

  async componentDidMount(){
    window.scrollTo(0,0)
    this.contractInstance = await salesContract

  }

  render() {
    return (
      <section>
        <section className="container-fluid block-row bg-contact">
          <div className="container">
            <div className="title-area">
              <h1 className="display-4">Products</h1>
            </div>
          </div>
        </section>
        <section className="container-fluid block-row">
          <div className="container">
            list of products
          </div>
        </section>
      </section>
    )
  }
}

export default Products