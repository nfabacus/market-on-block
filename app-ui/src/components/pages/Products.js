import React, { Component } from 'react'

import web3 from '../../ethereum/web3';
import salesContract from '../../ethereum/SalesContract'

import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap'

const styles = {
  img: {
    height: "200px",
    objectFit: "cover"
  }
}

class Products extends Component {

  state = {
    productCount: 0,
  }

  async componentDidMount(){
    window.scrollTo(0,0)
    this.contractInstance = await salesContract
    console.log('contactInstance>>>', this.contractInstance)
    let productCount = await this.contractInstance.getProductsCount()
    productCount = productCount['c'][0]
    let products = [...Array(productCount)].map(async(_, index) => {
      const product = await this.contractInstance.products(index)
      return { productId: product[0], productDescription: product[1], unitPrice: product[2].c[0], availableQty: product[3].c[0] }
    })
    products = await Promise.all(products)
    console.log('products>>>>', products)
    this.setState({
      productCount,
      products
    })
  }

  handleImgError = (productId) => {
    this.setState({
      handleImgError: {
        ...this.state.handleImgError, [productId]: true
      }
    })
  }

  render() {
    const { products, handleImgError } = this.state
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
            <p>Number of products listed: {this.state.productCount}</p>
            <Row>
              {
                products&&products.map(({productId, productDescription, unitPrice, availableQty}, i) => (
                  <Col lg="3" md="6" className="pb-4">
                    <Card className="h-100" key={i}>
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
                    </Card>
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

export default Products