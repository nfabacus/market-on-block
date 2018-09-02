import React from 'react'
import { withFormik, Form, Field } from 'formik'
import * as yup from 'yup'
import { FormGroup, Label, Button } from 'reactstrap'
import InputSection from './InputSection'

const innerForm = ({
  values,
  errors,
  product
}) => (
  <Form className="mt-2">
    <FormGroup>
      <Label for="availableQty">Order Qty</Label>
      <Field
        type="number"
        id="orderQty"
        name="orderQty"
        placeholder="e.g. 3"
        component={InputSection}
      />
    </FormGroup>
    <p><strong>Total Price: {values.orderQty*product.unitPrice}</strong></p>
    <Button
      type="submit"
      color="primary"
    >
      Confirm
    </Button>
  </Form>
);

const ProductEntryForm = withFormik({
  mapPropsToValues(props){
    return {
      orderQty: ''
    }
  },
  validationSchema: yup.object().shape({
    orderQty: yup.number().required().positive()
  }),
  handleSubmit(values, { resetForm, setErrors, setSubmitting, props }) {
    props.handleOrderSubmit(values)
    setSubmitting(false)
  }
})(innerForm)

export default ProductEntryForm