import Table from 'react-bootstrap/Table';
import React from "react";
import styled from 'styled-components';


    const unpackQueryData = (props) => {
    const firstName = props.queryData.firstName;
    const lastName = props.queryData.lastName;
    const phoneNumber = props.queryData.phoneNumber;
    const email = props.queryData.email;
    const specialRequest = props.queryData.specialRequest;
    const billingAddress = props.queryData.billingAddress;
    const roomType = props.queryData.roomType;
    const price = props.queryData.price;
    const hotelId = props.queryData.hotelId;
    const destination = props.queryData.destination;
    const checkInDate = props.queryData.checkInDate;
    const checkOutDate = props.queryData.checkOutDate;
    const rooms = props.queryData.rooms;
    const adults = props.queryData.adults;
    const children = props.queryData.children;
    const bookingRef = props.queryData.bookingRef;
}
const CONTAINER = styled.div`
  background: #f7f9fa;
  height: auto;
  width: auto;
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

function hotelReceipt(props){

    const {queryData} = props;
    return(
        <CONTAINER>
        <h1> Thank you for booking with us!</h1>
        <h3>The following is your booking information</h3>
        <Table striped>
            <thead>
                <tr>
                    <th><b>Information</b></th>
                    <th><b>Details</b></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>Destination ID </td>
                <td>{queryData.destination}</td>
                </tr>
                <tr>
                <td>Hotel ID </td>
                <td>{queryData.hotelId}</td>
                </tr>
                <tr>
                <td>Booking Reference </td>
                <td>{queryData.bookingRef}</td>
                </tr>
                <tr>
                <td>Start Date </td>
                <td>{queryData.checkInDate}</td>
                </tr>
                <tr>
                <td>End Date </td>
                <td>{queryData.checkOutDate}</td>
                </tr>
                <tr>
                <td>Number of People Staying </td>
                <td>{queryData.adults} adult(s) {queryData.children} child(ren)</td>
                </tr>
                <tr>
                <td>Room Type </td>
                <td>{queryData.roomType}</td>
                </tr>
                <tr>
                <td>Price </td>
                <td>{queryData.price}</td>
                </tr>
                <tr>
                <td>Guest's Name </td>
                <td>{queryData.firstName} {queryData.lastName}</td>
                </tr>
                <tr>
                <td>Guest's Phone Number </td>
                <td>{queryData.phoneNumber}</td>
                </tr>
                <tr>
                <td>Guest's Email </td>
                <td>{queryData.email}</td>
                </tr>
                <tr>
                <td>Guest's Special Request </td>
                <td>{queryData.specialRequest}</td>
                </tr>
                <tr>
                <td>Guest's Billing Address </td>
                <td>{queryData.billingAddress}</td>
                </tr>
            </tbody>
        </Table>
        </CONTAINER>
    );
}
export default hotelReceipt;

export async function getServerSideProps(context){
    const queryData = context.query;
    return {
      props: {
          queryData
      }
    }
}