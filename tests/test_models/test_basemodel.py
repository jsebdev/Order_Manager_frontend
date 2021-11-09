import unittest
import inspect
import pep8
from models import basemodel


BaseModel = basemodel.BaseModel


class TestbasemodelDocumentation(unittest.TestCase):
    """Class for testing the basemodel documentation"""

    BaseModelFunctions = inspect.getmembers(BaseModel, inspect.isfunction)

    def test_BaseModel_documentation_module(self):
        """Test for the existence of module docstring"""
        self.assertIsNot(basemodel.__doc__, None)

    def test_BaseModel_documentation(self):
        """Test for the existence of class docstring"""
        self.assertIsNot(basemodel.BaseModel.__doc__, None)

    def test_methods_docstrings(self):
        """
        Test for the presence of docstrings in BaseModel methods
        """
        for method in self.BaseModelFunctions:
            with self.subTest(method=method):
                self.assertIsNot(
                    method[1].__doc__, None,
                    "'{:s}' method is lacking documentation".format(method[0]))

    def test_pep8(self):
        """Test pep8 compliance"""
        style = pep8.StyleGuide(quiet=True)
        check = style.check_files(['models/basemodel.py'])
        self.assertEqual(check.total_errors, 0, "Found pep8 errors")
        check = style.check_files(['tests/test_models/test_basemodel.py'])
        self.assertEqual(check.total_errors, 0, "Found pep8 errors")


class testBaseModel(unittest.TestCase):
    """
    Class for testing BaseModel
    """

    def test_instance_types(self):
        """test correct types of instance created"""
        base = BaseModel()
        self.assertIs(type(base), BaseModel)
        base.att1 = "dato"
        base.num1 = 6
        attrs_types = {
            "id": str,
            "att1": str,
            "num1": int
        }
        for att, tp in attrs_types.items():
            with self.subTest(att=att, tp=tp):
                self.assertIn(att, base.__dict__)
                self.assertIs(type(base.__dict__[att]), tp)
        self.assertEqual(base.att1, "dato")
        self.assertEqual(base.num1, 6)

    def test_uuids(self):
        """Test different uuids in instances"""
        base0 = BaseModel()
        base1 = BaseModel()
        self.assertNotEqual(base0.id, base1.id)

    def test_str(self):
        """Test printing of baseModel"""
        base0 = BaseModel()
        obj_dict = base0.__dict__.copy()
        obj_dict.pop('_sa_instance_state', None)
        obj_dict.pop('id', None)
        string = "[{:s}] ({:s}) {}".format("BaseModel", base0.id, obj_dict)
