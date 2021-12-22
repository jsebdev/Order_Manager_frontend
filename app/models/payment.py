"""
Payment class file
"""
from sqlalchemy import Column, String, DateTime, Float, Boolean, Integer, ForeignKey, Sequence
from app.models.basemodel import BaseModel, Base
from sqlalchemy.orm import relationship
from datetime import datetime


class Payment(BaseModel, Base):
    """
    Payment class
    """
    __tablename__ = 'payments'

    _type = Column(String(50), nullable=True)
    date = Column(DateTime, nullable=True)
    total = Column(Float, nullable=True)
    order_id = Column(String(60), ForeignKey('orders.id'))
    date = Column(DateTime, nullable=False)

    order = relationship("Order", back_populates="payments")

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.date = datetime.now()
