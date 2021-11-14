import unittest
import inspect
import pep8
from models import engine
from models import storage
import models
from sqlalchemy import exc
from api.v1 import app


class Test_api_Documentation(unittest.TestCase):
    """Class for testing the api app documentation"""

    testFunctions = inspect.getmembers(app, inspect.isfunction)

    def setUp(self):
        pass

    def test_documentation_module(self):
        """Test for the existence of module docstring"""
        self.assertIsNot(app.__doc__, None)

    def test_methods_docstrings(self):
        """
        Test for the presence of docstrings in methods
        """
        for method in self.testFunctions:
            with self.subTest(method=method):
                self.assertIsNot(
                    method[1].__doc__, None,
                    "'{:s}' method is lacking documentation".format(method[0]))

    def test_pep8(self):
        """Test pep8 compliance"""
        style = pep8.StyleGuide(quiet=True)
        check = style.check_files(['api/v1/app.py'])
        self.assertEqual(check.total_errors, 0,
                         "Found pep8 errors in api/v1/app.py")
        check = style.check_files(['tests/test_api/test_api_app.py'])
        self.assertEqual(check.total_errors, 0,
                         "Found pep8 errors in tests/test_api/test_api_app.py")


class Test_enpoints(unittest.TestCase):
    """
    Test response of endpoints
    """

    def test_all_users():
        pass
