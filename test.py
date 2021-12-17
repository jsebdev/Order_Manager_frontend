#!/usr/bin/python3
from app.models import storage
from app.models.order import Order
from datetime import datetime

if __name__ == "__main__":
    order = Order(user_id="a")
    print("the new order is", order)
    order.save()

    print("the order user is", order.user)
