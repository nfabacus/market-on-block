import React, { Component } from 'react'

import web3 from '../../ethereum/web3';
import salesContract from '../../ethereum/SalesContract';
import { Button, Row, Col } from 'reactstrap'
import OrderCard from '../Cards/OrderCard'

class Orders extends Component {

  state = {
    totalOrder: 0,
    isAdmin: false
  }

  async componentDidMount(){
    window.scrollTo(0,0)
    this.contractInstance = await salesContract;
    let totalOrder = await this.contractInstance.orderNumber()
    totalOrder = totalOrder['c'][0]

    let orders = [...Array(totalOrder)]
      .map(async(_, index) => {
        let listedOrderNumber = await this.contractInstance.listedOrderNumbers(index)
        listedOrderNumber = listedOrderNumber.c[0]
        if(listedOrderNumber) {
          const retrievedOrder = await this.contractInstance.retrieveOrder(listedOrderNumber)
          return {
            orderNumber: listedOrderNumber,
            purchaser: retrievedOrder[0],
            productId: retrievedOrder[1],
            qty: retrievedOrder[2].c[0],
            unitPrice: retrievedOrder[3].c[0],
            totalPrice: retrievedOrder[4].c[0],
            paid: retrievedOrder[5],
            shipped: retrievedOrder[6],
            received: retrievedOrder[7]
          }
        }
        return null;
      })
      .filter(order => order !== null)

      orders = await Promise.all(orders)
      const seller = await this.contractInstance.seller()
      const accounts = await web3.eth.getAccounts()
      const currentUser = accounts[0].toLowerCase()
      const usersOrders = orders.filter(order => order.purchaser === currentUser || seller === currentUser)

      this.setState({
        totalOrder,
        orders: usersOrders,
        isAdmin: currentUser === seller? true : false
      })
  }

  handleOrderStatusChange = async (orderNumber, statusType) => {
    console.log(orderNumber, statusType)
    if(statusType==="ship"){
      console.log("shipping...")
      const accounts = await web3.eth.getAccounts()
      try {
        await this.contractInstance.ship(orderNumber, { from: accounts[0]})
      } catch(err) {
        console.log(err);
      }
    }
    if(statusType==="receive"){
      console.log("receiving...")
      const accounts = await web3.eth.getAccounts()
      try {
        await this.contractInstance.receive(orderNumber, { from: accounts[0]})
      } catch(err) {
        console.log(err);
      }
    }
  }

  render() {
    const { totalOrder, orders, isAdmin } = this.state

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
            <p>Number of orders listed: {totalOrder}</p>
            <Row>
              {
                orders&&orders.map((order, i) => (
                  <Col lg="3" md="6" className="pb-4" key={i}>
                    <OrderCard
                      order={order}
                      handleOnChange={this.handleOrderStatusChange}
                      isAdmin={isAdmin}
                    />
                  </Col>
                ))
              }
            </Row>
          </div>
        </section>
      </section>
    )
  }
}

export default Orders