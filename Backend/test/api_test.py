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

class CreateTest(TestCase):
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

class DeleteTest(TestCase):
    def test_delete_100_users(self):
        req_url = url + "/users/delete"
        for i in range(len(emails)):
            params = {"email": emails[i]}
            res = httpx.delete(req_url, params=params)
            assert res.status_code == 204


def suite():
    suite = TestSuite()
    suite.addTest(CreateTest("User Test 1"))
    suite.addTest(DeleteTest("User Test 2"))
    return suite

if __name__ == '__main__':
    runner = unittest.TextTestRunner(failfast=True)
    runner.run(suite())