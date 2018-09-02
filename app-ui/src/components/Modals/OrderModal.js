import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import web3 from '../../ethereum/web3';
import OrderForm from '../Form/OrderForm'
import ProductCard from '../ProductCards/ProductCard'

class OrderModal extends Component {

  handleOrderSubmit = async (values) => {
    const { productId, unitPrice } = this.props.selectedProduct
    const totalPrice =  values.orderQty * unitPrice
    const accounts = await web3.eth.getAccounts()

    try {
      await this.props.contractInstance.orderProduct(productId, values.orderQty, { from: accounts[0], value: totalPrice })
    } catch(err) {
      console.log(err);
    }


    this.props.toggle();
  }

  render() {
    const { selectedProduct } = this.props

    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.props.toggle}
        className={this.props.className}
      >
        <ModalHeader
          toggle={()=>this.props.toggle()}
        >
          Order Now!
        </ModalHeader>
        <ModalBody>
          <ProductCard
            product={this.props.selectedProduct}
          />
          <OrderForm
            product={this.props.selectedProduct}
            handleOrderSubmit={this.handleOrderSubmit}
          />
        </ModalBody>

      </Modal>
    )
  }
}

export default OrderModal