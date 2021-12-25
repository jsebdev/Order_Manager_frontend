#!/usr/bin/python3
""" Flask Application for api"""

from os import getenv
from flask import Flask, json, jsonify, request
from app.models import storage
from werkzeug.exceptions import NotFound
from flask_jwt_extended import create_access_token, jwt_required

from app.api.v1 import api
from app.models.app_user import App_User
from flask_cors import cross_origin

from app.models.order import Order
from app.models.payment import Payment
from app.models.shipping import Shipping
from app.models.user import User


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
    name = request.json.get("name", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = storage.one("App_User", email=email)
    if user:
        return jsonify({"msg": "There is already a user with that email"}), 405
    user = App_User(password=password, name=name, email=email)
    access_token = create_access_token(identity=email)
    user.save()
    return jsonify({"access_token": access_token, "user": {"name": user.name, "email": user.email}}), 200


@api.route("/updateclient", methods=["PUT"])
@jwt_required()
def edit_client():
    """
    Edit Client with id client_id
    """
    client_id = request.json.get("client_id", None)
    name = request.json.get("name", None)
    last_name = request.json.get("last_name", None)
    gov_id = request.json.get("gov_id", None)
    email = request.json.get("email", None)
    company = request.json.get("company", None)
    user = storage.one("User", id=client_id)
    if not user:
        return jsonify({"msg": "there is no client with id "+client_id}), 404
    user.name = name if name is not None else user.name
    user.last_name = last_name if last_name is not None else user.last_name
    user.gov_id = gov_id if gov_id is not None else user.gov_id
    user.email = email if email is not None else user.email
    user.company = company if company is not None else user.company
    user.save()
    return jsonify({"msg": "client updated", "client": user.to_dict()}), 200


@api.route("/updateorder", methods=["PUT"])
@jwt_required()
def edit_order():
    """
    Edit Order with id order_id
    """
    order_id = request.json.get("order_id", None)
    subtotal = request.json.get("subtotal", None)
    taxes = request.json.get("taxes", None)
    paid = request.json.get("paid", None)

    if not order_id:
        return jsonify({"msg": "missing order_id"}), 400

    order = storage.one("Order", id=order_id)
    if not order:
        return jsonify({"msg": "there is no order with id "+order_id}), 404
    order.subtotal = subtotal if subtotal is not None else order.subtotal
    order.taxes = taxes if taxes is not None else order.taxes
    order.paid = paid if paid is not None else order.paid
    order.save()
    return jsonify({"msg": "order updated", "order": order.to_dict()}), 200


@api.route("/updateshipping", methods=["PUT"])
@jwt_required()
def edit_shipping():
    """
    Edit Shippping with id shipping_id
    """
    shipping_id = request.json.get("shipping_id", None)
    address = request.json.get("address", None)
    city = request.json.get("city", None)
    state = request.json.get("state", None)
    country = request.json.get("country", None)
    cost = request.json.get("cost", None)
    delivered = request.json.get("delivered", None)
    shipping = storage.one("Shipping", id=shipping_id)

    if not shipping:
        return jsonify({"msg": "there is no shipping with id "+shipping_id}), 404
    shipping.address = address if address is not None else shipping.address
    shipping.city = city if city is not None else shipping.city
    shipping.state = state if state is not None else shipping.state
    shipping.country = country if country is not None else shipping.country
    shipping.cost = cost if cost is not None else shipping.cost
    shipping.delivered = delivered if delivered is not None else shipping.delivered
    shipping.save()
    return jsonify({"msg": "shipping updated", "shipping": shipping.to_dict()}), 200


@api.route("/delete/<string:id>", methods=["DELETE"])
@jwt_required()
def delete_item(id):
    item = storage.one(id=id)
    if item:
        item.delete()
        return ({"msg": "deleted"})
    return ({"msg": "Could not find item with id: "+id})


@api.route("/createclient", methods=["POST"])
@jwt_required()
def create_user():
    """Create new order"""
    name = request.json.get("name", None)
    last_name = request.json.get("last_name", None)
    gov_id = request.json.get("gov_id", False)
    email = request.json.get("email", False)
    company = request.json.get("company", False)

    newUser = User(name=name,
                   last_name=last_name, gov_id=gov_id, email=email, company=company)
    newUser.save()
    print(newUser)
    return jsonify({"msg": "user created", "client": newUser.to_dict()}), 200


@api.route("/createorder", methods=["POST"])
@jwt_required()
def create_order():
    """Create new order"""
    client_id = request.json.get("client_id", None)
    subtotal = request.json.get("subtotal", None)
    taxes = request.json.get("taxes", None)
    paid = request.json.get("paid", False)

    newOrder = Order(user_id=client_id, subtotal=subtotal,
                     taxes=taxes, paid=paid)
    order_dict = newOrder.to_dict()

    if (client_id):
        newOrder.save()
        return jsonify({"msg": "order created", "order": order_dict}), 200
    return jsonify({"msg": "client id missing"}), 400


@api.route("/createpayment", methods=["POST"])
@jwt_required()
def create_payment():
    """Create new Payment"""
    _type = request.json.get("type", None)
    total = request.json.get("total", False)
    order_id = request.json.get("order_id", False)

    new_payment = Payment(_type=_type, total=total, order_id=order_id)
    new_payment.save()
    return jsonify({"msg": "payment created"}), 200


@api.route("/createshipping", methods=["POST"])
@jwt_required()
def create_shipping():
    """Create new Shipping"""
    address = request.json.get("address", "")
    city = request.json.get("city", "")
    state = request.json.get("state", "")
    country = request.json.get("country", "")
    cost = request.json.get("cost", 0)
    delivered = request.json.get("delivered", False)
    order_id = request.json.get("order_id", False)

    print('la order_id is', order_id)

    new_shipping = Shipping(address=address, city=city, state=state,
                            country=country, cost=cost, delivered=delivered, order_id=order_id)
    new_shipping.save()
    return jsonify({"msg": "shipping created"}), 200


@api.route("/users/all", methods=["GET"])
# Here the endpoints has / at the end but the strict_slashes is set to False because YOLO
@api.route("/users/", methods=["GET"], strict_slashes=False)
@jwt_required()
def all_users():
    """
    Return info about all users
    """
    users = storage.all("User")
    users = [user.to_dict() for user in users]
    return jsonify(users)


@api.route("/users/<string:user_id>", methods=["GET"])
@jwt_required()
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
# @jwt_required()
def orders():
    """
    Return info about all orders
    """
    orders = storage.all("Order")
    # print('the orders are', orders)
    return jsonify(orders_info(orders))


@api.route("/orders/<string:order_id>", methods=["GET"])
@jwt_required()
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
@jwt_required()
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
@jwt_required()
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
@jwt_required()
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
@jwt_required()
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
    # print('one order is ', order)
    last_payment_date = None
    for payment in order.payments:
        if last_payment_date is None or payment.date > last_payment_date:
            last_payment_date = payment.date

    if order.paid:
        order_status = "Paid"
    else:
        order_status = "Not paid"

    # print('the order shipping info is ', order.shipping)
    shipping_info = order.shipping.to_dict() if order.shipping else None
    if shipping_info:
        shipping_info.pop('order_id', None)
        shipping_info.pop('order', None)

    user_information = order.user.to_dict() if order.user else None
    if user_information:
        user_information.pop('orders', None)

    client_name = ''
    gov_id = ''
    client_id = ''
    if order.user:
        client_name = (order.user.name or "") + ' ' + \
            (order.user.last_name or "")
        gov_id = order.user.gov_id or ''
        client_id = order.user.id or ''

    return {
        'order_id': order.id,
        'client_id': client_id,
        'client_name': client_name,
        'gov_id': gov_id,
        'order_date': order.date,
        'last_payment_date': last_payment_date,
        'order_status': order_status,
        'shipping_info': shipping_info,
        'subtotal': (order.subtotal or 0),
        'taxes': (order.taxes or 0),
        'total': (order.subtotal or 0) + (order.taxes or 0),
        'user_information': user_information,
        'paid': order.paid,
    }
