import unittest
from app.models import storage
from app import create_app


class BaseTestClass(unittest.TestCase):
    def setUp(self):
        self.app = create_app(settings_module='config.test')
        self.client = self.app.test_client()

        # This is not necesary since the storage is reloaded when initalized
        with self.app.app_context():
            storage.clear_all()
            storage.reload()

    def tearDown(self):
        with self.app.app_context():
            storage.close()
            storage.clear_all()
