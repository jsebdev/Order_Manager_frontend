#!/usr/bin/python3
""" Flask Application for api"""

from os import getenv
from flask import Flask, jsonify
from models import storage


app = Flask(__name__)


@app.route("/", methods=["GET"])
def hello_world():
    return "<p>Hello, World! yea</p>"


@app.route("/users/all", methods=["GET"])
def all_users():
    users = storage.all("User")
    users = [user.to_dict() for user in users.values()]
    return jsonify(users)


@app.route("/users/<string:user_id>", methods=["GET"])
def user_by_id(user_id):
    user = storage.all("User", id=user_id)
    if user:
        user = list(user.values())[0]
    else:
        return ("Not found", 404)
    return user.to_dict()


@app.route("/orders/<string:order_id>", methods=["GET"])
def order_by_id(order_id):
    order = storage.all("Order", id=order_id)
    if order:
        order = list(order.values())[0]
    else:
        return ("Not found", 404)
    return order_info(order)


@app.route("/orders/[<string:order_ids>]", methods=["GET"])
def orders_by_ids(order_ids):
    ids = order_ids.split(',')
    orders = storage.all_inclusive("Order", id=ids)
    orders = [order_info(order) for order in list(orders.values())]
    return jsonify(orders)


def order_info(order):
    """
    Return order dictionary with order info
    """
    last_payment_date = None
    for payment in order.payments:
        if last_payment_date is None or payment.date > last_payment_date:
            last_payment_date = payment.date

    if not order.paid:
        order_status = "Not paid"
    elif order.sent:
        order_status = "Paid but not sent"
    else:
        order_status = "Sent and received"

    shipping_info = order.shipping.to_dict()
    shipping_info.pop('order_id', None)

    user_information = order.user.to_dict()
    user_information.pop('password')
    user_information.pop('user_name')

    return {
        'order_id': order.id,
        'customer_id': order.user.id,
        'customer_name': order.user.name + ' ' + order.user.last_name,
        'gov_id': order.user.gov_id,
        'order_date': order.date,
        'last_payment_date': last_payment_date,
        'order_status': order_status,
        'shipping_info': shipping_info,
        'total': order.subtotal + order.taxes,
        'user_information': user_information
    }


if __name__ == "__main__":
    port = getenv('PORT')
    host = getenv('HOST')
    if not port:
        port = 5000
    if not host:
        host = '0.0.0.0'
    app.run(host=host, port=port, threaded=True, debug=True)
