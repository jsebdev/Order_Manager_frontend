"""
Payment class file
"""
from sqlalchemy import Column, String, DateTime, Float, Boolean, Integer, ForeignKey
from models.basemodel import BaseModel, Base
from sqlalchemy.orm import relationship


class Payment(BaseModel, Base):
    """
    Payment class
    """
    __tablename__ = 'payments'

    _type = Column(String(50), nullable=True)
    date = Column(DateTime, nullable=True)
    txn_id = Column(String(20), nullable=False)
    total = Column(Float, nullable=True)
    delivered = Column(Boolean, nullable=True)
    order_id = Column(String(60), ForeignKey('orders.id'))

    order = relationship("Order", back_populates="payments")

