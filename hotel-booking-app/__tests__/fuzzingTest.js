import http from 'k6/http';
import {check,sleep} from 'k6'

export let options = {
    stages: [
        {duration:'5s', target:100},
        {duration:'5s',target:100},
        {duration:'5s', target:0},
    ]
}

export default function () {
  //Simulate inflow of Users to our website
  let res = http.get("http://localhost:3000/");
  check(res, {'status was 200': r => r.status ==200});
  sleep(1);

  //Simulate influx of Users submitting bookingData to our DB
  const url = 'http://localhost:8000/booking/create';
  const payload = JSON.stringify({
    "destID": "stri",
    "hotelID": "stri",
    "price": 10101231,
    "bookingRef": `${Math.random()*99999}`,
    "supplierID": "string",
    "supplierRes": [],
    "display": {
      "numOfNights": 4,
      "startDate": "2022-08-04",
      "endDate": "2022-08-04",
      "adults": 2,
      "children": 2,
      "roomType": [
        "string"
      ],
      "message": "string"
    },
    "guest": {
      "salutation": "string",
      "firstName": "string",
      "lastName": "string",
      "phone": "string",
      "email": "user@example.com"
    },
    "payment": {
      "paymentID": "string",
      "payeeID": "string"
    }
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let res2 = http.post(url, payload, params);
  check(res2, {'upload status was 200': r => r.status ==200});
  sleep(1);

//   //Delete the post req so that DB dont get cluttered
//   const delUrl = 'http://localhost:8000/booking/delete';
//   let res3 = http.del(delUrl,JSON.params=stringify({"bookingRef": "string"}))
//   check(res3, {'delete status was 200': r => r.status ==200});
//   sleep(1);
}