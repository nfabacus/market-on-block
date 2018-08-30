import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';

class Admin extends Component {

  componentDidMount(){
    window.scrollTo(0,0)
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
            <Form>
            <FormGroup>
              <Label for="productId">Product Id</Label>
              <Input id="productId" />
              <FormText>Please add the product id here.</FormText>
            </FormGroup>
            <FormGroup>
              <Label for="productId">Short Product Description</Label>
              <Input id="productId" />
              <FormText>Please add a short product description.</FormText>
            </FormGroup>
            <FormGroup>
              <Label for="productId">Unit Price</Label>
              <Input id="productId" />
              <FormText>Please add its unit price here.</FormText>
            </FormGroup>
            <FormGroup>
              <Label for="productId">Available Qty</Label>
              <Input id="productId" />
              <FormText>Please add its available Qty here.</FormText>
            </FormGroup>
            </Form>
          </div>
        </section>
      </section>
    )
  }
}

export default Admin