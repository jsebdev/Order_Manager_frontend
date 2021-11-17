from os.path import abspath, dirname


BASE_DIR = dirname(dirname(abspath(__file__)))

SECRET_KEY = 'AliceInWonderland'

APP_ENV_DEV = 'development'
APP_ENV_PROD = 'production'
APP_ENV_TEST = 'test'
