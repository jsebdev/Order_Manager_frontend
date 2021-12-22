"""
Order class file
"""
from sqlalchemy import Column, String, DateTime, Float, Boolean, Integer, ForeignKey
from sqlalchemy.orm import relationship
from app.models.basemodel import BaseModel, Base
from app.models.payment import Payment
from datetime import datetime


class Order(BaseModel, Base):
    """
    Order class
    """
    __tablename__ = 'orders'

    user_id = Column(String(60), ForeignKey('users.id'), nullable=False)
    date = Column(DateTime, nullable=False)
    subtotal = Column(Float, nullable=True)
    taxes = Column(Float, nullable=True)
    paid = Column(Boolean, nullable=True)
    sent = Column(Boolean, nullable=True)

    user = relationship("User", back_populates="orders")
    shipping = relationship("Shipping", back_populates="order", uselist=False,
                            cascade="all, delete, delete-orphan")
    payments = relationship("Payment", order_by=Payment.id,
                            back_populates="order", cascade="all, delete, delete-orphan")

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.date = datetime.now()
