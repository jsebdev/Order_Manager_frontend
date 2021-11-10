#!/usr/bin/python3
"""
Contains the class Storage
"""

from models.basemodel import Base
from models.user import User
from models.order import Order
from models.shipping import Shipping
from models.payment import Payment
from sqlalchemy.orm import sessionmaker, scoped_session
from sqlalchemy import create_engine
from os import getenv


classes = {'User': User,
           'Order': Order,
           'Shipping': Shipping,
           'Payment': Payment}


class Storage:
    """
    Storage Class, this object controls all the comunication
    with the database
    """
    __engine = None
    __session = None

    def __init__(self):
        """Instantiate a Storage object"""
        test = getenv('TEST')
        if test == 'test':
            self.__engine = create_engine(
                'mysql+mysqldb://orders_dev:orders_dev_pwd@localhost/orders_\
test',
                pool_pre_ping=True)
            Base.metadata.drop_all(self.__engine)
        else:
            self.__engine = create_engine(
                'mysql+mysqldb://orders_dev:orders_dev_pwd@localhost/orders',
                pool_pre_ping=True)

    def all(self, cls=None, **kwargs):
        """
        Method to return all instances from database of a given class or
        all instances from all classes
        """
        objs_dict = {}
        if cls is None:
            for one_class in classes.values():
                objs = self.__session.query(one_class).filter_by(
                    **kwargs).order_by(one_class.id).all()
                for obj in objs:
                    objs_dict[obj.__class__.__name__ + '.' + obj.id] = obj
        elif cls in classes.keys():
            the_class = classes[cls]
            objs = self.__session.query(the_class).filter_by(
                **kwargs).order_by(the_class.id).all()
            for obj in objs:
                objs_dict[obj.__class__.__name__ + '.' + obj.id] = obj
        else:
            print("No class of type {:s}".format(cls))
            return None
        return objs_dict

    def reload(self):
        """reloads data from the database"""
        Base.metadata.create_all(self.__engine)
        session_factory = sessionmaker(bind=self.__engine)
        self.__session = scoped_session(session_factory)

    def close(self):
        """call remove() method on the private session attribute"""
        self.__session.remove()

    def new(self, obj):
        """add the object to the current database session"""
        self.__session.add(obj)

    def save(self):
        """commit all changes of the current database session"""
        self.__session.commit()

    def delete(self, obj=None):
        """delete from the current database session obj if not None"""
        if obj is not None:
            self.__session.delete(obj)

    def rollback(self):
        """rollback session"""
        self.__session.rollback()
