import React, { Component } from 'react'
import { Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap'

const styles = {
  img: {
    height: "200px",
    objectFit: "cover"
  }
}

class ProductCard extends Component {

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
    const {productId, productDescription, unitPrice, availableQty} = this.props.product
    return (
      <Card className="h-100">
        {
          handleImgError&&handleImgError[productId]?
          <CardImg style={styles.img} top src={`http://res.cloudinary.com/abacus/image/upload/shop-on-the-block/products/defaultImg.jpg`} alt="placeholder img"/>
          :
          <CardImg style={styles.img} top src={`http://res.cloudinary.com/abacus/image/upload/shop-on-the-block/products/${productId}.jpg?`} alt={productId} onError={()=>this.handleImgError(productId)}/>
        }
        <CardBody>
          <CardTitle>{productDescription}</CardTitle>
          <CardText>Product Id: {productId}</CardText>
          <CardText>Unit Price: {unitPrice}</CardText>
          <CardText>Available Qty: {availableQty}</CardText>
        </CardBody>
        {this.props.children}
      </Card>
    )
  }
}

export default ProductCard