"""
User class file
"""
from sqlalchemy import Column, String
from sqlalchemy.orm import relationship
from models.basemodel import Base, BaseModel
from models.order import Order



class User(BaseModel, Base):
    """
    User class
    """
    __tablename__ = 'users'

    name = Column(String(50), nullable=False)
    last_name = Column(String(50), nullable=True)
    gov_id = Column(String(50), nullable=False, primary_key=True)
    email = Column(String(100), nullable=True)
    company = Column(String(50), nullable=True)
    password = Column(String(50), nullable=True)
    user_name = Column(String(50), nullable=True)

    orders = relationship("Order", order_by=Order.order_id, back_populates="user")
