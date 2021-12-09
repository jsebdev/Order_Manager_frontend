from .default import *
DATABASE_URI = 'mysql+mysqldb://orders_dev:orders_dev_pwd@localhost/\
orders_test'
APP_ENV = APP_ENV_TEST

TESTING = True
DEBUG = True

WRG_CSRF_ENABLED = False
