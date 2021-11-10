import unittest
import inspect
import pep8
from models import engine
from models import storage
import models
# from MySQLdb import IntegrityError
# from django.db import IntegrityError
# from errors import IntegrityError
from sqlalchemy import exc


class TeststorageDocumentation(unittest.TestCase):
    """Class for testing the storage documentation"""

    storageFunctions = inspect.getmembers(engine.storage, inspect.isfunction)

    def test_storage_documentation_module(self):
        """Test for the existence of module docstring"""
        self.assertIsNot(engine.storage.__doc__, None)

    def test_Storage_documentation(self):
        """Test for the existence of class docstring"""
        self.assertIsNot(engine.storage.Storage.__doc__, None)

    def test_methods_docstrings(self):
        """
        Test for the presence of docstrings in BaseModel methods
        """
        for method in self.storageFunctions:
            with self.subTest(method=method):
                self.assertIsNot(
                    method[1].__doc__, None,
                    "'{:s}' method is lacking documentation".format(method[0]))

    def test_pep8(self):
        """Test pep8 compliance"""
        style = pep8.StyleGuide(quiet=True)
        check = style.check_files(['models/engine/storage.py'])
        self.assertEqual(check.total_errors, 0, "Found pep8 errors in storage")
        check = style.check_files(
            ['tests/test_models/test_engine/test_storage.py'])
        self.assertEqual(check.total_errors, 0,
                         "Found pep8 errors in test_storage")


class testStorage(unittest.TestCase):
    """
    Class for testing BaseModel
    """

    def test_create_user(self):
        """test if users are created correctly"""
        user0 = models.user.User(name="Francisco")
        user1 = models.user.User(name="Laura")
        user0.save()
        user1.save()
        user_saved = storage.all('User', id=user0.id)
        user_saved = next(iter(user_saved.values()))
        self.assertEqual(user0, user_saved)
        user_saved = storage.all('User', id=user1.id)
        user_saved = next(iter(user_saved.values()))
        self.assertEqual(user1, user_saved)

    def test_create_order(self):
        """test if orders are created correctly"""
        user0 = models.user.User(name="Mariano")
        order00 = models.order.Order(user_id=user0.id)
        user0.save()
        order00.save()

        user_saved = storage.all('User', id=user0.id)
        user_saved = next(iter(user_saved.values()))
        self.assertEqual(user0.orders, [order00])

        with self.assertRaises(exc.IntegrityError):
            user1 = models.user.User(name="Fajito")
            order10 = models.order.Order(user_id=user1.id)
            order10.save()

        storage.rollback()
