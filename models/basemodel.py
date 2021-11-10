"""
Base class file
"""
from sqlalchemy import Column, String
from sqlalchemy.ext.declarative import declarative_base
import uuid
import models

Base = declarative_base()


class BaseModel:
    """
    BaseModel class
    """

    id = Column(String(60), primary_key=True)

    def __init__(self, **kwargs):
        """
        Initialization of the base model, hence any object
        """
        if kwargs:
            if kwargs.get("id", None) is None:
                self.id = str(uuid.uuid4())
            for key, value in kwargs.items():
                setattr(self, key, value)
        else:
            self.id = str(uuid.uuid4())

    def __str__(self):
        """
        String representation of the BaseModel class
        """
        obj_dict = self.__dict__.copy()
        obj_dict.pop('_sa_instance_state', None)
        obj_dict.pop('id', None)
        return "[{:s}] ({:s}) {}".format(self.__class__.__name__, self.id,
                                         obj_dict)

    def save(self):
        """
        Saves object in database
        """
        models.storage.new(self)
        models.storage.save()

    def delete(self):
        """
        Deletes object in database
        """
        models.storage.delete(self)
        models.storage.save()
