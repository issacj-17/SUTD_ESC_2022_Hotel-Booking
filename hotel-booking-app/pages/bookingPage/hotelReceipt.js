import Table from 'react-bootstrap/Table';
import React from "react";

function hotelReceipt(){
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
                </tr>
                <tr>
                <td>Hotel ID </td>
                </tr>
                <tr>
                <td>Number of Night(s) </td>
                </tr>
                <tr>
                <td>Start Date </td>
                </tr>
                <tr>
                <td>End Date </td>
                </tr>
                <tr>
                <td>Number of People Staying </td>
                </tr>
                <tr>
                <td>Room Type </td>
                </tr>
                <tr>
                <td>Price </td>
                </tr>
                <tr>
                <td>Guest's Name </td>
                </tr>
                <tr>
                <td>Guest's Phone Number </td>
                </tr>
                <tr>
                <td>Guest's Email </td>
                </tr>
                <tr>
                <td>Guest's Special Request </td>
                </tr>
                <tr>
                <td>Guest's Billing Address </td>
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