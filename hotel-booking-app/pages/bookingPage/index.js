import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import {Form, Button, Row, Col} from "react-bootstrap";
import styled from 'styled-components';
import valid from 'card-validator';
import Router,{useRouter} from 'next/router';
import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';


const CONTAINER = styled.div`
  background: #f7f9fa;
  height: auto;
  width: 100%;
  color: snow;
  -webkit-box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.4);
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.4);

  label {
    color: #24b9b6;
    font-size: 1.2em;
    font-weight: 300;
  }

  h1 {
    color: #24b9b6;
    text-align: center;
    padding-top: 0.5em;
  }

  .form-group {
    margin-top: 2.5em;
    margin-bottom: 2.5em;
  }

  .error {
    border: 2px solid #ff6565;
  }
    .error-message {
    color: #FF6565;
    padding: .2em .3em;
    height: 1em;
    font-size: .8em;
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


const schema = Yup.object().shape({
  firstName: Yup.string()
    .typeError("Invalid name")
    .min(2, "*Names must have at least 2 characters")
    .max(100, "*Names can't be longer than 100 characters")
    .required("Required")
    .matches(/^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,'Name can only contain Latin letters'),
  lastName: Yup.string()
    .typeError("Invalid name")
    .max(20, "Must be 20 characters or less")
    .required("Required")
    .matches(/^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,'Name can only contain Latin letters'),
  phoneNumber: Yup.string()
    .typeError("That does not look like a phone number")
    .min(8, "Your phone number is not valid")
    .required("Required")
    .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Phone number is not valid'),
  email: Yup.string()
    .email("Invalid email address")
    .required("Required"),
  specialRequest: Yup.string(),
  bankCard: Yup.number()
    .typeError("Your bank card is not valid")
    .required("Required")
    .test('test-number', // this is used internally by yup
    'Credit Card number is invalid', //validation message
     value => valid.number(value).isValid), // return true false based on validation
  expiryDate: Yup.string()
  .required("Required")
  .typeError('Not a valid expiration date. Example: MM/YY')
  .max(5, 'Not a valid expiration date. Example: MM/YY')
  .matches(
    /([0-9]{2})\/([0-9]{2})/,
    'Not a valid expiration date. Example: MM/YY'
  )
  .test(
    'test-credit-card-expiration-date',
    'Invalid Expiration Date has past',
    expirationDate => {
      if (!expirationDate) {
        return false
      }

      const today = new Date()
      const monthToday = today.getMonth() + 1
      const yearToday = today
        .getFullYear()
        .toString()
        .substr(-2)

      const [expMonth, expYear] = expirationDate.split('/')

      if (Number(expYear) < Number(yearToday)) {
        return false
      } else if (
        Number(expMonth) < monthToday &&
        Number(expYear) <= Number(yearToday)
      ) {
        return false
      }

      return true
    }
  )
  .test(
    'test-credit-card-expiration-date',
    'Invalid Expiration Month',
    expirationDate => {
      if (!expirationDate) {
        return false
      }
      const today = new Date()
        .getFullYear()
        .toString()
        .substr(-2)

      const [expMonth] = expirationDate.split('/')

      if (Number(expMonth) > 12) {
        return false
      }

      return true
    }
  ),
  CVV: Yup.number()
    .typeError("Invalid CVV/CVC")
    .test('len', 'Must be exactly 3 characters', val => val && val.toString().length === 3 )
    .required("Required"),
  billingAddress: Yup.string()
    .typeError("Your address is not valid")
    .required("Required"),
});

function bookingPage(props) {
// const{
//   query:{}
// } = router

  function sendProps(values){
    var CryptoJS = require("crypto-js");
    const guest = {
      "salutation": "Mr./Ms.",
      "firstName": values.firstName,
      "lastName": values.lastName,
      "phone": values.phoneNumber,
      "email": values.email
    };
    guestinfo = CryptoJS.AES.encrypt(guest)
    var bookingRefGen = Math.floor(100000 + Math.random() * 900000)
    var supplierIDGen = Math.floor(10000 + Math.random() * 90000)
    var paymentIDGen = Math.floor(100000 + Math.random() * 900000)
    var payeeIDGen = Math.floor(10000 + Math.random() * 90000)
    const postData = async () => {
      console.log(submitAPIData)
      const response = await fetch('http://localhost:8000/booking/create', {
        method: 'POST',
        body: JSON.stringify(submitAPIData),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      console.log(data)
    }

    var submitAPIData = {
      "destID": props.queryResult.destination,
      "hotelID": props.queryResult.hotelId,
      "price": props.queryResult.price,
      "bookingRef": bookingRefGen,
      "supplierID": supplierIDGen,
      "supplierRes": [],
      "display": {
        "numOfNights": parseInt((new Date(props.queryResult.checkOutDate) - new Date(props.queryResult.checkInDate))/(1000 * 60 * 60 * 24)),
        "startDate": props.queryResult.checkInDate,
        "endDate": props.queryResult.checkOutDate,
        "adults": props.queryResult.adults,
        "children": props.queryResult.children,
        "roomType": [
          props.queryResult.roomType
        ],
        "message": values.specialRequest
      },
      "guest": guestinfo,
      "payment": {
        "paymentID": paymentIDGen,
        "payeeID": paymentIDGen
      }
    }

    postData()

    Router.push({pathname:"/bookingPage/hotelReceipt",
  query:{
    firstName:values.firstName,
    lastName: values.lastName,
    phoneNumber: values.phoneNumber,
    email: values.email,
    specialRequest: values.specialRequest,
    billingAddress: values.billingAddress,
    roomType: props.queryResult.roomType,
    price: props.queryResult.price,
    hotelId: props.queryResult.hotelId,
    destination: props.queryResult.destination,
    checkInDate: props.queryResult.checkInDate,
    checkOutDate: props.queryResult.checkOutDate,
    rooms: props.queryResult.rooms,
    adults: props.queryResult.adults,
    children: props.queryResult.children,
    bookingRef: bookingRefGen,
    paymentID: payeeIDGen,
    payeeID: payeeIDGen,
  }})

  }
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
              resetForm();
              setSubmitting(false);
              sendProps(values);
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
              <Row className = "mb-4">
              <Form.Group as={Col} md="4" controlId="firstName">
                <Form.Label> First Name</Form.Label>
                <Form.Control
                  data-testid="firstName"
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                  className={touched.firstName && errors.firstName ? "error" : null}
                  />
                  {touched.firstName && errors.firstName ? (
                    <div className="error-message">{errors.firstName}</div>
                  ): null}
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="lastName">
                <Form.Label> Last Name</Form.Label>
                <Form.Control
                  data-testid="lastName"
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                  className={touched.lastName && errors.lastName ? "error" : null}
                  />
                  {touched.lastName && errors.lastName ? (
                    <div className="error-message">{errors.lastName}</div>
                  ): null}
              </Form.Group>
              </Row>
              <Row className = "mb-4">
              <Form.Group as={Col} md="5" controlId="phoneNumber">
                <Form.Label> Phone Number </Form.Label>
                <Form.Control
                  data-testid="phoneNumber"
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phoneNumber}
                  className={touched.phoneNumber && errors.phoneNumber ? "error" : null}
                  />
                  {touched.phoneNumber && errors.phoneNumber ? (
                    <div className="error-message">{errors.phoneNumber}</div>
                  ): null}
              </Form.Group>
              <Form.Group as={Col} md="7" controlId="email">
                <Form.Label> Email </Form.Label>
                <Form.Control
                  data-testid="email"
                  type="text"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className={touched.email && errors.email ? "error" : null}
                  />
                  {touched.email && errors.email ? (
                    <div className="error-message">{errors.email}</div>
                  ): null}
              </Form.Group>
              </Row>
              <Row className = "mb-4">
              <Form.Group as={Col} md="12" controlId="specialRequest">
                <Form.Label> Special Request </Form.Label>
                <Form.Control
                  data-testid="specialRequest"
                  type="text"
                  name="specialRequest"
                  placeholder="Special Request"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.specialRequest}/>
              </Form.Group>
              </Row>
              <Row className = "mb-4">
              <Form.Group as={Col} md="6" controlId="bankCard">
                <Form.Label> Bank Card Number </Form.Label>
                <Form.Control
                  data-testid="bankCard"
                  type="text"
                  name="bankCard"
                  placeholder="Bank Card Number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.bankCard}
                  className={touched.bankCard && errors.bankCard ? "error" : null}
                  />
                  {touched.bankCard && errors.bankCard ? (
                    <div className="error-message">{errors.bankCard}</div>
                  ): null}
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="expiryDate">
                <Form.Label> Expiry Date </Form.Label>
                <Form.Control
                data-testid="expiryDate"
                  type="text"
                  name="expiryDate"
                  placeholder="MM/YY"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.expiryDate}
                  className={touched.expiryDate && errors.expiryDate ? "error" : null}
                  />
                  {touched.expiryDate && errors.expiryDate ? (
                    <div className="error-message">{errors.expiryDate}</div>
                  ): null}
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="CVV">
                <Form.Label> CVV/CVC </Form.Label>
                <Form.Control
                  data-testid="CVV"
                  type="text"
                  name="CVV"
                  placeholder="CVV/CVC"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.CVV}
                  className={touched.CVV && errors.CVV ? "error" : null}
                  />
                  {touched.CVV && errors.CVV ? (
                    <div className="error-message">{errors.CVV}</div>
                  ): null}
              </Form.Group>
              </Row>
              <Row className = "mb-4">
              <Form.Group as={Col} md="12" controlId="billingAddress">
                <Form.Label> Billing Address </Form.Label>
                <Form.Control
                  data-testid="billingAddress"
                  type="text"
                  name="billingAddress"
                  placeholder="Billing Address"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.billingAddress}
                  className={touched.billingAddress && errors.billingAddress ? "error" : null}
                  />
                  {touched.billingAddress && errors.billingAddress ? (
                    <div className="error-message">{errors.billingAddress}</div>
                  ): null}
              </Form.Group>
              </Row>
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


export async function getServerSideProps(context){
    const queryResult = context.query;
    return {
      props: {
          queryResult
      }
    }
}
