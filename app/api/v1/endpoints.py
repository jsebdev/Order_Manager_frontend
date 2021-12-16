#!/usr/bin/python3
""" Flask Application for api"""

from os import getenv
from flask import Flask, jsonify, request
from app.models import storage
from werkzeug.exceptions import NotFound
from flask_jwt_extended import create_access_token, jwt_required

from app.api.v1 import api
from app.models.app_user import App_User
from flask_cors import cross_origin


@api.route("/login", methods=["POST"])
def get_token():
    """
    Get secret token if username and password are correct
    """
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = storage.one("App_User", email=email)
    if user is None or not user.check_password(password):
        return jsonify({"msg": "Bad username or password"}), 401
    access_token = create_access_token(identity=email)
    return jsonify({"access_token": access_token, "user": {"name": user.name, "email": user.email}}), 200


@api.route("/signup", methods=["POST"])
def create_user_app():
    """
    Create new user and Get secret token
    """
    print('the request.form is ', request.form)

    name = request.json.get("name", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    print('the name is', name)
    print('the email is', email)
    print('the password is', password)
    user = storage.one("App_User", email=email)
    if user:
        return jsonify({"msg": "There is already a user with that email"}), 405
    user = App_User(password=password, name=name, email=email)
    access_token = create_access_token(identity=email)
    user.save()
    return jsonify({"access_token": access_token, "user": {"name": user.name, "email": user.email}}), 200


@api.route("/users/all", methods=["GET"])
# Here the endpoints has / at the end but the strict_slashes is set to False because YOLO
@api.route("/users/", methods=["GET"], strict_slashes=False)
# @api.route("/users/", methods=["GET"])
@jwt_required()
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
        raise NotFound(user_id)
    return user.to_dict()


@api.route("/orders", methods=["GET"])
@jwt_required()
def orders():
    """
    Return info about all orders
    """
    orders = storage.all("Order")
    print('the orders are', orders)
    return jsonify(orders_info(orders))


@api.route("/orders/<string:order_id>", methods=["GET"])
def order_by_id(order_id):
    """
    Return info about order with <order_id>
    """
    order = storage.all("Order", id=order_id)
    if order:
        order = order[0]
    else:
        raise NotFound(order_id)
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
    print('one order is ', order)
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

    print('the order shipping info is ', order.shipping)
    shipping_info = order.shipping.to_dict() if order.shipping else None
    if shipping_info:
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
