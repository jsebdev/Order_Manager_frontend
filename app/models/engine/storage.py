#!/usr/bin/python3
"""
Contains the class Storage
"""

from app.models.basemodel import Base
from app.models.user import User
from app.models.app_user import App_User
from app.models.order import Order
from app.models.shipping import Shipping
from app.models.payment import Payment
from sqlalchemy.orm import sessionmaker, scoped_session
from sqlalchemy import create_engine, exc
from os import getenv
from datetime import datetime
import importlib

classes = {'User': User,
           'Order': Order,
           'Shipping': Shipping,
           'Payment': Payment,
           'App_User': App_User}


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

        app_settings_s = getenv('APP_SETTINGS')
        app_settings = importlib.import_module(app_settings_s)
        self.__engine = create_engine(app_settings.DATABASE_URI,
                                      pool_pre_ping=True)
        if app_settings_s == 'config.test':
            self.clear_all()
        self.reload()

    def clear_all(self):
        """
        Delete all tables in database
        """
        Base.metadata.drop_all(self.__engine)

    def delete_users(self):
        """
        Delete all users, hence all data
        """
        users = self.__session.query(User).all()
        for user in users:
            user.delete()
        self.__session.commit()

    def all(self, cls=None, **kwargs):
        """
        Method to return all instances from database of a given class or
        all instances from all classes
        kwargs must be None or specific columns and values respectively
        """
        # objs_dict = {}
        if cls is None:
            for one_class in classes.values():
                objs = self.__session.query(one_class).filter_by(
                    **kwargs).order_by(one_class.id).all()
                # objs_dict = Storage.add_to_dict(objs_dict, objs)
        elif cls in classes.keys():
            the_class = classes[cls]
            objs = self.__session.query(the_class).filter_by(
                **kwargs).order_by(the_class.id).all()
            # objs_dict = Storage.add_to_dict(objs_dict, objs)
        else:
            print("No class of type {:s}".format(cls))
            return None
        return objs

    def one(self, cls=None, **kwargs):
        """
        Method to return first instance from database of a given class that
        fulfills kwargs filters
        kwargs must be None or specific columns and values respectively
        """
        if cls is None:
            for one_class in classes.values():
                try:
                    objs = self.__session.query(one_class).filter_by(
                        **kwargs).order_by(one_class.id).one()
                except exc.NoResultFound:
                    objs = None
                if objs:
                    return objs
        elif cls in classes.keys():
            the_class = classes[cls]
            try:
                objs = self.__session.query(the_class).filter_by(
                    **kwargs).order_by(the_class.id).one()
            except exc.NoResultFound:
                print("No row was found for query that was supposed to return\
 one")
                return None
            except exc.MultipleResultsFound:
                print("Multiple rows was found for query that was supposed\
 to return one")
                return None
        else:
            print("No class of type {:s}".format(cls))
            return None
        return objs

    def all_inclusive(self, cls=None, **kwargs):
        """
        Method to return all instances from database of a given class or
        all instances from all classes
        kwargs must be a dictionary with only one key and an array of values
        as value
        """
        key = list(kwargs)[0]
        array = list(kwargs.values())[0]
        # objs_dict = {}
        if cls is None:
            for one_class in classes.values():
                objs = eval('self._Storage__session.query(one_class).filter(\
one_class.{}.in_(array)).order_by(one_class.id).all()'.format(key))
                # objs_dict = Storage.add_to_dict(objs_dict, objs)
        elif cls in classes.keys():
            the_class = classes[cls]
            objs = eval('self._Storage__session.query(the_class).filter(\
the_class.{}.in_(array)).order_by(the_class.id).all()'.format(key))
            # objs_dict = Storage.add_to_dict(objs_dict, objs)
        else:
            print("No class of type {:s}".format(cls))
            return None
        return objs

    @classmethod
    def add_to_dict(cls, objs_dict, objs):
        """
        This method add to the dictionary dic, all the objects in list objs
        with formated like key. The key's format is '<Class>.<id>'
        """
        for obj in objs:
            objs_dict[obj.__class__.__name__ + '.' + obj.id] = obj
        return objs_dict

    def all_logged_users(self):
        """Return all users with user_name and password different than Null"""
        users = self.__session.query(User).filter(
            User.user_name is not None, User.password is not None).all()
        return users

    def order_by_dates(self, d0, d1):
        """
        Return query of orders between date0 and date1
        the dates format must be %d-%m-%Y
        """
        date0 = datetime.strptime(d0, '%d-%m-%Y')
        date1 = datetime.strptime(d1, '%d-%m-%Y')
        orders = self.__session.query(Order).filter(Order.date >= date0,
                                                    Order.date <= date1).all()
        return orders

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

    def dummy_database(self):
        users_ids = ['a', 'b', 'c', 'd']
        users_names = ['pepe', 'Juan', 'Stefa', 'Manita']
        users_last_names = ['Jamir', 'Dedo', 'Santolomeo', None]
        users_gov_ids = ['ga', 'gb', 'gc', 'gd']
        users_usersnames = ['pepe25', 'Juancho89', None, None]
        user_passwords = ['pepepwd', 'juanpwd', None, None]

        users = []
        for i in range(len(users_ids)):
            users.append(User(id=users_ids[i], name=users_names[i],
                              last_name=users_last_names[i],
                              gov_id=users_gov_ids[i],
                              users_name=users_usersnames[i],
                              password=user_passwords[i]))

        self.__session.add_all(users)
        self.__session.commit()
