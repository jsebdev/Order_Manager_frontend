#!/usr/bin/python3
from models.user import User
from models.order import Order, Base
from models.shipping import Shipping
from models.payment import Payment
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import sqlalchemy
from models import storage
import requests

if __name__ == "__main__":
    # payload = {'username': 'pepegrillo', 'password': 'pepe_pwd'}
    # r = requests.post('http://localhost:5000/login', data=payload)
    # print(r.text)

    Juancho = storage.one("User", company="Univalle")
    print(Juancho)
