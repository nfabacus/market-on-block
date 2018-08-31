import React from 'react'
import { withFormik, Form, Field } from 'formik'
import * as yup from 'yup'
import { FormGroup, Label, Button } from 'reactstrap'
import InputSection from './InputSection'

const innerForm = ({
  values,
  errors
}) => (
  <Form>
    <FormGroup>
      <Label for="productId">Product Id</Label>
      <Field
        type="text"
        id="productId"
        name="productId"
        placeholder="e.g. unique product id"
        component={InputSection}
      />
    </FormGroup>
    <FormGroup>
      <Label for="productDescription">Short product description</Label>
      <Field
        type="text"
        id="productDescription"
        name="productDescription"
        placeholder="e.g. Blue T-shirt"
        component={InputSection}
      />
    </FormGroup>
    <FormGroup>
      <Label for="unitPrice">Unit price</Label>
      <Field
        type="number"
        id="unitPrice"
        name="unitPrice"
        placeholder="e.g. 10"
        component={InputSection}
      />
    </FormGroup>
    <FormGroup>
      <Label for="availableQty">Available Qty</Label>
      <Field
        type="number"
        id="availableQty"
        name="availableQty"
        placeholder="e.g. 20"
        component={InputSection}
      />
    </FormGroup>
    <Button
      type="submit"
      color="primary"
    >
      Submit
    </Button>
  </Form>
);

const ProductEntryForm = withFormik({
  mapPropsToValues(props){
    return {
      productId: '',
      productDescription: '',
      unitPrice: '',
      availableQty: ''
    }
  },
  validationSchema: yup.object().shape({
    productId: yup.string().required(),
    productDescription: yup.string().required(),
    unitPrice: yup.number().required().positive(),
    availableQty: yup.number().required().positive()
  }),
  handleSubmit(values, { resetForm, setErrors, setSubmitting, props }) {
    props.handleProductSubmit(values)
    setSubmitting(false)
  }
})(innerForm)

export default ProductEntryForm