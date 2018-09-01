import React, { Component } from 'react'

import web3 from '../../ethereum/web3';
import salesContract from '../../ethereum/SalesContract';

class Orders extends Component {

  async componentDidMount(){
    window.scrollTo(0,0)
    this.contractInstance = await salesContract;
    console.log('contactInstance>>>', this.contractInstance)
  }

  render() {
    return (
      <section>
        <section className="container-fluid block-row bg-order">
          <div className="container">
            <div className="title-area">
              <h1 className="display-4">Orders</h1>
            </div>
          </div>
        </section>
        <section className="container-fluid block-row">
          <div className="container">
            List
          </div>
        </section>
      </section>
    )
  }
}

export default Orders