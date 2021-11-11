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
    order_id = Column(String(60), ForeignKey('orders.id'), nullable=False)

    order = relationship("Order", back_populates="shipping")
