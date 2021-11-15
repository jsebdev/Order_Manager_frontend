#!/usr/bin/python3
""" Flask Application for api"""

from os import getenv
from flask import Flask, jsonify, request
from app.models import storage

from app.api.v1 import api


@api.route("/logins", methods=["POST"])
def get_token():
    """
    Get secret token if username and password are correct
    """
    password = request.form.get('password')
    username = request.form.get('username')
    loged_users = storage.all_logged_users()
    for user in loged_users:
        if user.user_name == username and user.password == password:
            return "Alicia_in_worderland"
    return "Not quite right"


@api.route("/users/all", methods=["GET"])
def all_users():
    """
    Return info about all users
    """
    users = storage.all("User")
    users = [user.to_dict() for user in users]
    return jsonify(users)


@api.route("/users/<string:user_id>", methods=["GET"])
def user_by_id(user_id):
    """
    Return info of user with <user_id>
    """
    user = storage.all("User", id=user_id)
    if user:
        user = user[0]
    else:
        return ("Not found", 404)
    return user.to_dict()


@api.route("/orders/<string:order_id>", methods=["GET"])
def order_by_id(order_id):
    """
    Return info about order with <order_id>
    """
    order = storage.all("Order", id=order_id)
    if order:
        order = order[0]
    else:
        return ("Not found", 404)
    return order_info(order)


@api.route("/orders/[<string:order_ids>]", methods=["GET"])
def orders_by_ids(order_ids):
    """
    return info about orders with id in <order_ids>
    """
    ids = order_ids.split(',')
    orders = storage.all_inclusive("Order", id=ids)
    if orders:
        return jsonify(orders_info(orders))
    return ("Not found", 404)


@api.route("/orders/<string:date0> - <string:date1>", methods=["GET"])
def order_by_dates(date0, date1):
    """
    Return info of orders between date0 and date1
    the dates format must be %d-%m-%Y
    """
    orders = storage.order_by_dates(date0, date1)
    if orders:
        return jsonify(orders_info(orders))
    return ("Not found", 404)


@api.route("/orders/shipping/{<string:key>=<string:value>}")
def order_by_shipping(key, value):
    """
    return all orders with the given key (city, state, country)
    """
    kwargs = {}
    kwargs[key] = value
    shippings = storage.all("Shipping", **kwargs)
    orders = [shipping.order for shipping in shippings]
    return jsonify(orders_info(orders))


@api.route("/orders/user/<string:user_id>")
def order_by_user(user_id):
    """
    Return info for orders of user with user_id
    """
    user = storage.all("User", id=user_id)
    if user:
        user = user[0]
        return jsonify(orders_info(user.orders))
    return ("Not found", 404)


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
