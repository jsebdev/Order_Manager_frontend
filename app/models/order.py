"""
Order class file
"""
from sqlalchemy import Column, String, DateTime, Float, Boolean, Integer, ForeignKey
from sqlalchemy.orm import relationship
from app.models.basemodel import BaseModel, Base
from app.models.shipping import Shipping
from app.models.payment import Payment


class Order(BaseModel, Base):
    """
    Order class
    """
    __tablename__ = 'orders'

    user_id = Column(String(60), ForeignKey('users.id'))
    date = Column(DateTime, nullable=True)
    subtotal = Column(Float, nullable=True)
    taxes = Column(Float, nullable=True)
    paid = Column(Boolean, nullable=True)
    sent = Column(Boolean, nullable=True)

    user = relationship("User", back_populates="orders")
    shipping = relationship("Shipping", back_populates="order", uselist=False,
                            cascade="all, delete, delete-orphan")
    payments = relationship("Payment", order_by=Payment.txn_id,
                            back_populates="order", cascade="all, delete, delete-orphan")
