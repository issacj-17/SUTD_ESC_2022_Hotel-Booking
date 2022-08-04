from fastapi.testclient import TestClient
from unittest import TestSuite, TestCase, TextTestRunner, main
from decouple import config
from faker import Faker
import uvicorn
import httpx
import time

host = config("HOST")
port = config("PORT")
url = f"http://{host}:{port}"

fake = Faker()

emails = []
res_json = []
bookings = []

class CreateUserTest(TestCase):
    # Initialise Attributes
    """Testing of Users API to check functionality"""
    def test_create_100_users(self):
        req_url = url + "/users/create"
        for i in range(100):
            firstName = fake.first_name()
            lastName = fake.last_name()
            email = fake.ascii_free_email()
            password = fake.password(length=12)

            emails.append(email)
            data = {
                "firstName": firstName,
                "lastName": lastName,
                "email": email,
                "password": password
            }

            res = httpx.post(req_url, json=data)
            # print(res.status_code, res.text)
            assert res.status_code == 200
            self.assertEqual(firstName, res.json()["firstName"])
            self.assertEqual(lastName, res.json()["lastName"])
            self.assertEqual(email, res.json()["email"])
            res_json.append(res.json())

    def test_get_100_users(self):
        req_url = url + "/users/get"
        for i in range(len(emails)):
            params = {"email": emails[i]}
            # print(self.emails[i], i)
            res = httpx.get(req_url, params=params)
            # print(res.status_code, res.text)
            assert res.status_code == 200

class DeleteUserTest(TestCase):
    """Testing of Users API to check functionality"""
    def test_delete_100_users(self):
        req_url = url + "/users/delete"
        for i in range(len(emails)):
            params = {"email": emails[i]}
            res = httpx.delete(req_url, params=params)
            assert res.status_code == 204

    def clear(self):
        emails = []
        res_json = []

class CreateBookingTest(TestCase):

    def test_create_100_bookings(self):
        req_url = url + "/booking/create"
        for i in range(100):
            bookingRef = fake.pystr()
            model = {
                "destID": "stri",
                "hotelID": "stri",
                "price": 10,
                "bookingRef": bookingRef,
                "supplierID": "string",
                "supplierRes": [],
                "display": {
                    "numOfNights": 2,
                    "startDate": "2022-08-10",
                    "endDate": "2022-08-12",
                    "adults": 1,
                    "children": 0,
                    "roomType": [
                        "string"
                    ],
                    "message": "string"
                },
                "guest": {
                    "salutation": "string",
                    "firstName": fake.first_name(),
                    "lastName": fake.last_name(),
                    "phone": "string",
                    "email": fake.ascii_free_email(),
                },
                "payment": {
                    "paymentID": "string",
                    "payeeID": "string"
                }
            }
            bookings.append(bookingRef)

            res = httpx.post(req_url, json=model)
            assert res.status_code == 200

    def test_get_100_bookings(self):
        req_url = url + "/booking/get"
        for i in range(len(bookings)):
            params = {"bookingRef": bookings[i]}
            # print(self.emails[i], i)
            res = httpx.get(req_url, params=params)
            # print(res.status_code, res.text)
            assert res.status_code == 200

    def test_add_100_bookings(self):

        for i in range(100):
            req_url = url + "/users/create"
            firstName = fake.first_name()
            lastName = fake.last_name()
            email = fake.ascii_free_email()
            password = fake.password(length=12)

            emails.append(email)
            data = {
                "firstName": firstName,
                "lastName": lastName,
                "email": email,
                "password": password
            }

            res = httpx.post(req_url, json=data)

            print(res.status_code, res.text)
            assert res.status_code == 200
            self.assertEqual(firstName, res.json()["firstName"])
            self.assertEqual(lastName, res.json()["lastName"])
            self.assertEqual(email, res.json()["email"])
            res_json.append(res.json())

            req_url = url + "/booking/create"
            bookingRef = fake.pystr()
            firstName = fake.first_name()
            print(firstName)
            lastName = fake.last_name()

            model = {
                "destID": "stri",
                "hotelID": "stri",
                "price": 10,
                "bookingRef": bookingRef,
                "supplierID": "string",
                "supplierRes": [],
                "display": {
                    "numOfNights": 2,
                    "startDate": "2022-08-10",
                    "endDate": "2022-08-12",
                    "adults": 1,
                    "children": 0,
                    "roomType": [
                        "string"
                    ],
                    "message": "string"
                },
                "guest": {
                    "salutation": "Mr",
                    "firstName": firstName,
                    "lastName": lastName,
                    "phone": "987654321",
                    "email": emails[i],
                },
                "payment": {
                    "paymentID": "string",
                    "payeeID": "string"
                }
            }
            bookings.append(bookingRef)

            res = httpx.post(req_url, json=model)
            print(res.status_code, res.text)
            assert res.status_code == 200

            req_url = url + "/booking/add"
            params = {
                "bookingRef": bookingRef,
                "email": emails[i],
            }
            res = httpx.patch(req_url, params=params)
            assert res.status_code == 200

        def clear(self):
            emails = []
            res_json = []


def suite():
    suite = TestSuite()
    suite.addTest(CreateUserTest("User Test 1"))
    suite.addTest(DeleteUserTest("User Test 2"))
    return suite

def booking():
    suite = TestSuite()
    suite.addTest(CreateBookingTest("Booking Test 1"))
    return suite

if __name__ == '__main__':
    runner = unittest.TextTestRunner(failfast=True)
    runner.run(suite())
    runner.run(booking())