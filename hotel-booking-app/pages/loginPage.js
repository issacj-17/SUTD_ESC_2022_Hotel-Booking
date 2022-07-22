import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import {Form, Button, Row, Col} from "react-bootstrap";
import styled from 'styled-components';



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
    loginEmail: Yup.string()
    .email("Invalid email address")
    .required("Required"),
    loginPassword: Yup.string()
    .min(8)
    .max(20)
    .required("Required"),
});

function loginPage() {

  return (
      <CONTAINER>
        <h1> Login </h1>
        <Formik
                validationSchema={schema}
                initialValues={{
                    loginEmail: "",
                    loginPassword: "",
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
            errors,
          }) => (
            <MYFORM onSubmit={handleSubmit} className="mx-auto">
             <Form.Group controlId="loginEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                name="loginEmail"
                placeholder="Email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.loginEmail}
                className={touched.loginEmail && errors.loginEmail ? "error" : null}
                />
                {touched.loginEmail && errors.loginEmail ? (
                  <div loginEmail="error-message">{errors.loginEmail}</div>
                ): null}
                </Form.Group>
            <Form.Group controlId="loginPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                name="loginPassword"
                placeholder="Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.loginPassword}
                className={touched.loginPassword && errors.loginPassword ? "error" : null}
                />
                {touched.loginPassword && errors.loginPassword ? (
                  <div loginPassword="error-message">{errors.loginPassword}</div>
                ): null}
                </Form.Group>

              <MYBUTTON variant="primary" type="submit" disabled={isSubmitting}>
                Login
              </MYBUTTON>
            </MYFORM>
          )}
        </Formik>
      </CONTAINER>
  );
};
export default loginPage;
