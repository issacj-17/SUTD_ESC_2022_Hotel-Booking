import Table from 'react-bootstrap/Table';
import React from "react";

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
}

function hotelReceipt(props){
    const {queryData} = props;
    return(
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
                <tr>
                <td>Payment ID</td>
                </tr>
                <tr>
                <td>Payee ID </td>
                </tr>
            </tbody>
        </Table>
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