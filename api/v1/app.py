#!/usr/bin/python3
""" Flask Application for api"""

from os import getenv
from flask import Flask, jsonify, request
from models import storage


app = Flask(__name__)


@app.route("/", methods=["GET"])
def hello_world():
    return "<p>Hello, World! yea</p>"


@app.route("/login", methods=["POST"])
def get_token():
    form = request.form
    return "this is a post"


@app.route("/login", methods=["GET"])
def login():
    return "this is a get"


@app.route("/users/all", methods=["GET"])
def all_users():
    users = storage.all("User")
    users = [user.to_dict() for user in users.values()]
    for user in users:
        user.pop('password')
        user.pop('user_name')
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
    if orders:
        return jsonify(orders_info(orders.values()))
    return ("Not found", 404)


@app.route("/orders/<string:date0> - <string:date1>", methods=["GET"])
def order_by_dates(date0, date1):
    """
    Return info of orders between date0 and date1
    the dates format must be %d-%m-%Y
    """
    orders = storage.order_by_dates(date0, date1)
    if orders:
        return jsonify(orders_info(orders))
    return ("Not found", 404)


@app.route("/orders/shipping/{<string:key>=<string:value>}")
def order_by_shipping(key, value):
    """
    return all orders with the given key (city, state, country)
    """
    kwargs = {}
    kwargs[key] = value
    shippings = storage.all("Shipping", **kwargs)
    orders = [shipping.order for shipping in shippings.values()]
    return jsonify(orders_info(orders))


@app.route("/orders/user/<string:user_id>")
def order_by_user(user_id):
    """
    Return info for orders of user with user_id
    """
    user = storage.all("User", id=user_id)
    user = list(user.values())[0]
    return jsonify(orders_info(user.orders))


def orders_info(orders):
    """
    Return list of order dictionaries with orders info from orders
    """
    return [order_info(order) for order in list(orders)]


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
    shipping_info.pop('order', None)

    user_information = order.user.to_dict()
    user_information.pop('password', None)
    user_information.pop('user_name', None)
    user_information.pop('orders', None)

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
