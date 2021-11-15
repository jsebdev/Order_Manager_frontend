from flask import Blueprint

frontend = Blueprint('frontend', __name__, template_folder='templates')

from . import frontend_routes
