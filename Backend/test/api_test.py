from fastapi.testclient import TestClient
from unittest import TestCase, main
import orjson as json

from app.app import client

class MyTestCase(TestCase):
    def test_something(self):
        self.assertEqual(True, False)  # add assertion here


if __name__ == '__main__':
    main()
