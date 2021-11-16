from app import create_app
import os

app_settings = os.getenv('APP_SETTINGS')

app = create_app(settings_module=app_settings)
