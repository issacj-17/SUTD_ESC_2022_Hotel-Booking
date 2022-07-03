import Head from "next/head";
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import {Form, Button} from "react-bootstrap";
import styled from 'styled-components';

const CONTAINER = styled.div`
  background: #f7f9fa;
  height: 100%;
  width: 100%;
  color: snow;

  @media (min-width: 786px) {
    width: 100%;
  }

  @media (min-height: 786px) {
    height: 100%;
  }

  label {
    color: #24b9b6;
    font-size: 1.2em;
    font-weight: 400;
  }

  h1 {
    color: #24b9b6;
    text-align: center;
    padding-top: 0.5em;
  }

  .form-group {
    margin-bottom: 5em;
  }

  .error {
    border: 2px solid #ff6565;
  }
  }
`;

const MYFORM = styled(Form)`
  width: 90%;
  text-align: left;
  padding-top: 1em;
  padding-bottom: 3em;

`;


const MYBUTTON = styled(Button)`
  background: #1863ab;
  border: none;
  font-size: 1.2em;

  &:hover {
    background: #1d3461;
  }
`;
const phoneRegExp =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

const schema = Yup.object().shape({
  firstName: Yup.string()
    .typeError("Invalid name")
    .min(2, "*Names must have at least 2 characters")
    .max(100, "*Names can't be longer than 100 characters")
    .required("*Name is required"),
  lastName: Yup.string()
    .typeError("Invalid name")
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  phoneNumber: Yup.number()
    .typeError("That does not look like a phone number")
    .positive("A phone number cannot start with a minus")
    .min(8, "Your phone number is not valid")
    .required("Required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Required"),
  specialRequest: Yup.string(),
  bankCard: Yup.number()
    .typeError("Your bank card is not valid")
    .min(16, "Your bank card is not valid")
    .max(16, "Your bank card is not valid")
    .required("Required"),
  expiryDate: Yup.date().required("Required"),
  CVV: Yup.number()
    .min(3, "Your CVV/CVC is not valid")
    .max(3, "Your CVV/CVC is not valid")
    .required("Required"),
  billingAddress: Yup.string()
    .typeError("Your address is not valid")
    .required("Required"),
});

function bookingPage() {
  return (
      <CONTAINER>
        <h1> Guest Information Collection Form </h1>
        <Formik
          validationSchema={schema}
          initialValues={{
            firstName: "",
            lastName: "",
            phoneNumber: "",
            email: "",
            specialRequest: "",
            bankCard: "",
            expiryDate: "",
            CVV: "",
            billingAddress: "",
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            // When button submits form and form is in the process of submitting, submit button is disabled
            setSubmitting(true);

            // Simulate submitting to database, shows us values submitted, resets form
              setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              resetForm();
              setSubmitting(false);
            }, 500);
          }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            isSubmitting,
            values,
            touched,
            isValid,
            errors,
          }) => (
            <MYFORM onSubmit={handleSubmit} className="mx-auto">
              {console.log(values)}
              <Form.Group controlId="firstName">
                <Form.Label> First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                  isInvalid={touched.firstName && !!errors.firstName}
                />
                <Form.Control.Feedback type = "invalid" tooltip>
                  {errors.firstName}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="lastName">
                <Form.Label> Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                  isInvalid={touched.lastName && !!errors.lastName}
                />
                <Form.Control.Feedback type = "invalid" tooltip>
                  {errors.lastName}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="phoneNumber">
                <Form.Label> Phone Number </Form.Label>
                <Form.Control
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phoneNumber}
                  isInvalid={touched.phoneNumber && !!errors.phoneNumber}
                />
                <Form.Control.Feedback type = "invalid" tooltip>
                  {errors.phoneNumber}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label> Email </Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  isInvalid={touched.email && !!errors.email}
                />
                <Form.Control.Feedback type = "invalid" tooltip>
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="specialRequest">
                <Form.Label> Special Request </Form.Label>
                <Form.Control
                  type="text"
                  name="specialRequest"
                  placeholder="Special Request"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.specialRequest}
                  isInvalid={touched.specialRequest && !!errors.specialRequest}
                />
                <Form.Control.Feedback type = "invalid" tooltip>
                  {errors.specialRequest}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="bankCard">
                <Form.Label> Bank Card Number </Form.Label>
                <Form.Control
                  type="text"
                  name="bandCard"
                  placeholder="Bank Card Number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.bankCard}
                  isInvalid={touched.bankCard && !!errors.bankCard}
                />
                <Form.Control.Feedback type = "invalid" tooltip>
                  {errors.bankCard}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="expiryDate">
                <Form.Label> Expiry Date </Form.Label>
                <Form.Control
                  type="date"
                  name="expiryDate"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.expiryDate}
                  isInvalid={touched.expiryDate && !!errors.expiryDate}
                />
                <Form.Control.Feedback type = "invalid" tooltip>
                  {errors.expiryDate}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="CVV">
                <Form.Label> CVV/CVC </Form.Label>
                <Form.Control
                  type="text"
                  name="CVV"
                  placeholder="CVV/CVC"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.CVV}
                  isInvalid={touched.CVV && !!errors.CVV}
                />
                <Form.Control.Feedback type = "invalid" tooltip>
                  {errors.CVV}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="billingAddress">
                <Form.Label> Billing Address </Form.Label>
                <Form.Control
                  type="text"
                  name="billingAddress"
                  placeholder="Billing Address"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.billingAddress}
                  isInvalid={touched.billingAddress && !!errors.billingAddress}
                />
                <Form.Control.Feedback type = "invalid" tooltip>
                  {errors.billingAddress}
                </Form.Control.Feedback>
              </Form.Group>
              <MYBUTTON variant="primary" type="submit" disabled={isSubmitting}>
                Submit
              </MYBUTTON>
            </MYFORM>
          )}
        </Formik>
      </CONTAINER>
  );
};
export default bookingPage;
