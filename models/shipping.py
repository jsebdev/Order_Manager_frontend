"""
Shipping class file
"""
from sqlalchemy import Column, String, DateTime, Float, Boolean, Integer, ForeignKey
from models.basemodel import BaseModel, Base
from sqlalchemy.orm import relationship


class Shipping(BaseModel, Base):
    """
    Shipping class
    """
    __tablename__ = 'shippings'

    address = Column(String(80), nullable=True)
    city = Column(String(50), nullable=True)
    state = Column(String(50), nullable=True)
    country = Column(String(50), nullable=True)
    cost = Column(Float, nullable=True)
    order_id = Column(Integer, ForeignKey('orders.order_id'), nullable=False)
    shipping_id = Column(Integer, primary_key=True)

    order = relationship("Order", back_populates="shippings")
