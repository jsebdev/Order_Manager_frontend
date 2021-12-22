#!/usr/bin/python3
from app.models import storage
from app.models.order import Order
from app.models.payment import Payment
from app.models.user import User

if __name__ == "__main__":
    storage.clear_all()
    storage.reload()
    # user = User(name="juanito")
    # order = Order(user_id=user.id)
    # payment1 = Payment(order_id=order.id)
    # payment2 = Payment(order_id=order.id)
    # print("the payment 1: ", payment1)
    # print("the payment 2: ", payment1)
    # user.save()
    # order.save()
    # payment1.save()
    # payment2.save()
