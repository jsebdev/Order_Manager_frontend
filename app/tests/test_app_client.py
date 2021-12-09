from . import BaseTestClass

class AppClientTestCase(BaseTestClass):

    def test_index(self):
        res = self.client.get('/')
        self.assertEqual(200, res.status_code)
        self.assertIn(b'Order Manager', res.data)
