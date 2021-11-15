"""
User class file
"""

from sqlalchemy import Column, String
from sqlalchemy.orm import relationship
from app.models.basemodel import Base, BaseModel
from app.models.order import Order
from flask_login import UserMixin
from flask_login import LoginManager
from werkzeug.security import generate_password_hash, check_password_hash


class User(BaseModel, Base, UserMixin):
    """
    User class
    """
    __tablename__ = 'users'

    name = Column(String(80), nullable=False)
    last_name = Column(String(80), nullable=True)
    gov_id = Column(String(50), nullable=True)
    email = Column(String(100), nullable=True)
    company = Column(String(50), nullable=True)

    orders = relationship("Order", order_by=Order.id, back_populates="user",
                          cascade="all, delete, delete-orphan")
