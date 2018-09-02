import React, { Component, Fragment } from 'react'
import salesContract from '../../ethereum/SalesContract'

import { Button, Row, Col } from 'reactstrap'
import OrderModal from '../Modals/OrderModal'
import ProductCard from '../Cards/ProductCard'

class Products extends Component {

  state = {
    productCount: 0,
    modal: false
  }

  async componentDidMount(){
    window.scrollTo(0,0)
    this.contractInstance = await salesContract
    console.log('contactInstance>>>', this.contractInstance)
    let productIdListWholeCount = await this.contractInstance.getListedProductsIdLength()
    productIdListWholeCount =  productIdListWholeCount['c'][0]
    let productCount = await this.contractInstance.productsCount()
    productCount = productCount['c'][0]
    console.log('wholeCount>>', productIdListWholeCount)
    console.log(productCount)

    let products = [...Array(productIdListWholeCount)]
      .map(async(_, index) => {
        const productId = await this.contractInstance.getListedProduct(index)
        if(productId) {
          const product = await this.contractInstance.retrieveProduct(productId)
          return { productId: product[0], productDescription: product[1], unitPrice: product[2].c[0], availableQty: product[3].c[0] }
        }
        return null
      })
      .filter(product => product !== null)

    products = await Promise.all(products)
    
    this.setState({
      productCount,
      products
    })

    this.contractInstance.ProductEvent({}, {
      fromBlock: 0,
      toBlock: 'latest'
    }).watch((error, event)=>{
      let product = event.args.product;
      console.log("updated product!!!>>>", product)
      product = { productId: product[0], productDescription: product[1], unitPrice: product[2].c[0], availableQty: product[3].c[0] }
      console.log("updated product formatted!!!>>>", product)
    })
  }

  toggleModal = (values) => {
    this.setState({
      modal: !this.state.modal,
      selectedProduct: values?values: ""
    })
  } 

  render() {
    const { productCount, products } = this.state
    return (
      <Fragment>
        <OrderModal
          isOpen={this.state.modal}
          toggle={this.toggleModal}
          selectedProduct={this.state.selectedProduct}
          contractInstance={this.contractInstance}
        />
        <section>
          <section className="container-fluid block-row bg-shop">
            <div className="container">
              <div className="title-area">
                <h1 className="display-4">Products</h1>
              </div>
            </div>
          </section>
          <section className="container-fluid block-row">
            <div className="container">
              <p>Number of products listed: {productCount}</p>
              <Row>
                {
                  products&&products.map((product, i) => (
                    <Col lg="3" md="6" className="pb-4" key={i}>
                      <ProductCard
                        product={product}
                      >
                        <Button
                          color="primary"
                          className="m-3"
                          onClick={()=>this.toggleModal(product)}
                        >
                          Order
                        </Button>
                      </ProductCard>
                    </Col>
                  ))
                }
              </Row>

            </div>
          </section>
        </section>
      </Fragment>
    )
  }
}

export default Products