"""
App user class file
"""
from sqlalchemy import Column, String
from sqlalchemy.orm import relationship
from models.basemodel import Base, BaseModel
from models.order import Order
from flask_login import UserMixin
from flask_login import LoginManager
from werkzeug.security import generate_password_hash, check_password_hash


class App_User(BaseModel, Base, UserMixin):
    """
    User class
    """
    __tablename__ = 'app_users'

    name = Column(String(80), nullable=False)
    email = Column(String(100), nullable=True)
    password = Column(String(1000), nullable=True)

    def __init__(self, password="1234", **kwargs):
        """
        Init User class, here the class makes sure the password is hashed
        """
        super().__init__(**kwargs, password=generate_password_hash(password))

    def check_password(self, password):
        """
        Method to check if password is the same as self.password
        """
        return check_password_hash(self.password, password)
