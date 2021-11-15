from flask_assets import Environment, Bundle
from flask import Flask
from flask_login import LoginManager

# LoginManager
login_manager = LoginManager()


def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'AliceInWonderland'
    assets = Environment(app)

    # Init login_manager
    login_manager.init_app(app)
    login_manager.login_view = "login"

    # Api and frontend Blueprints registrations
    from app.api.v1 import api
    app.register_blueprint(api)
    from app.frontend import frontend
    app.register_blueprint(frontend)

    # scss bundle
    scss = Bundle('scss/main.scss', filters='libsass', output='css/all.css')
    assets.register('css_all', scss)
    return app
