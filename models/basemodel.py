"""
Base class file
"""
from sqlalchemy import Column, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class BaseModel:
    """
    BaseModel class
    """

    def __str__(self):
        """String representation of the BaseModel class"""
        return "{}".format(self.__dict__)
