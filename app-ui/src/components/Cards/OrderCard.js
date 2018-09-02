import React, { Component } from 'react'
import { FormGroup, Label, Input, Button, Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap'

const styles = {
  img: {
    height: "200px",
    objectFit: "cover"
  }
}

class OrderCard extends Component {

  state={
    handleImgError: null
  }

  handleImgError = (productId) => {
    this.setState({
      handleImgError: {
        ...this.state.handleImgError, [productId]: true
      }
    })
  }

  render() {
    const { handleImgError } = this.state
    const { orderNumber, purchaser, productId, qty, unitPrice, totalPrice, paid, shipped, received } = this.props.order
    const { isAdmin } = this.props
    return (
      <Card className="h-100">
        {
          handleImgError&&handleImgError[productId]?
          <CardImg style={styles.img} top src={`http://res.cloudinary.com/abacus/image/upload/shop-on-the-block/products/defaultImg.jpg`} alt="placeholder img"/>
          :
          <CardImg style={styles.img} top src={`http://res.cloudinary.com/abacus/image/upload/shop-on-the-block/products/${productId}.jpg?`} alt={productId} onError={()=>this.handleImgError(productId)}/>
        }
        <CardBody>
          <CardTitle>Order No: {orderNumber}</CardTitle>
          {
            isAdmin&&
              <CardText>Purchaser: {purchaser}</CardText>
          }
          <CardText>Product Id: {productId}</CardText>
          <CardText>Unit Price: {unitPrice}</CardText>
          <CardText>Total Price: {totalPrice}</CardText>
          <CardText>Ordered Qty: {qty}</CardText>
          <FormGroup check>
            <Label check>
              <Input type="checkbox" checked={paid} readOnly />{' '}
                Paid
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                checked={shipped}
                onChange={()=>this.props.handleOnChange(orderNumber, "ship")}
              />{' '}
                Shipped
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                checked={received}
                onChange={()=>this.props.handleOnChange(orderNumber, "receive")}
              />{' '}
                Received
            </Label>
          </FormGroup>
        </CardBody>
        {this.props.children}
      </Card>
    )
  }
}

export default OrderCard