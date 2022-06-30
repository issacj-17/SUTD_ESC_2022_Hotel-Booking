import Head from 'next/head'
import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const bookingPage = () => {
  return (
    <Formik
    initialValues = {{firstName:'', lastName:'', phoneNumber:'', email:'',specialRequest:'',bankCard:'',expiryDate:'',CVV:'',billingAddress:''}}
    validationSchema = {Yup.object({
      firstName: Yup.string()
        .typeError('Invalid name')
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      lastName: Yup.string()
        .typeError('Invalid name')
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      phoneNumber: Yup.number()
        .typeError('That does not look like a phone number')
        .positive('A phone number cannot start with a minus')
        .integer('A phone number cannot include a decimal point')
        .min(8,'Your phone number is not valid')
        .required('Required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      specialRequest: Yup.string(),
      bankCard: Yup.number()
        .typeError('Your bank card is not valid')
        .min(16, 'Your bank card is not valid')
        .max(16, 'Your bank card is not valid')
        .required('Required'),
      expiryDate: Yup.date()
        .required('Required'),
      CVV: Yup.number()
        .min(3, 'Your CVV/CVC is not valid')
        .max(3, 'Your CVV/CVC is not valid')
        .required('Required'),
      billingAddress: Yup.string()
      .typeError('Your address is not valid')
        .required('Required'),
    })}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 400);
    }}
    >
      <Form>
        <label htmlFor="firstName">First Name</label>
            <Field name="firstName" type="text" />
            <ErrorMessage name="firstName" />
    
            <label htmlFor="lastName">Last Name</label>
            <Field name="lastName" type="text" />
            <ErrorMessage name="lastName" />

            <label htmlFor="phoneNumber">Phone Number</label>
            <Field name="lastName" type="number" />
            <ErrorMessage name="phoneNumber" />

            <label htmlFor="email">Email Address</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" />

            <label htmlFor="specialRequest">Special Request for Your Room</label>
            <Field name="lastName" type="text" />
            <ErrorMessage name="specialRequest" />

            <label htmlFor="bankCard">Band Card Number</label>
            <Field name="bankCard" type="number" />
            <ErrorMessage name="bankCard" />

            <label htmlFor="expiryDate">Expiry Date</label>
            <Field name="expiryDate" type="date" />
            <ErrorMessage name="expiryDate" />

            <label htmlFor="CVV">CVV/CVC</label>
            <Field name="CVV" type="number" />
            <ErrorMessage name="CVV/CVC" />

            <label htmlFor="billingAddress">Billing Address</label>
            <Field name="billingAddress" type="string" />
            <ErrorMessage name="billingAddress" />

            <button type="submit">Submit</button>
      </Form>
    </Formik>
  )
}
export default bookingPage