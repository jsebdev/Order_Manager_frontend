"""
Order class file
"""
from sqlalchemy import Column, String, DateTime, Float, Boolean, Integer, ForeignKey
from sqlalchemy.orm import relationship
from models.basemodel import BaseModel, Base
from models.shipping import Shipping
from models.payment import Payment


class Order(BaseModel, Base):
    """
    Order class
    """
    __tablename__ = 'orders'

    user_id = Column(String(50), ForeignKey('users.gov_id'), nullable=False)
    date = Column(DateTime, nullable=True)
    subtotal = Column(Float, nullable=True)
    taxes = Column(Float, nullable=True)
    paid = Column(Boolean, nullable=True)
    order_id = Column(Integer, nullable=False, primary_key=True)

    user = relationship("User", back_populates="orders")
    shippings = relationship("Shipping", order_by=Shipping.shipping_id, back_populates="order")
    payments = relationship("Payment", order_by=Payment.txn_id, back_populates="order")

