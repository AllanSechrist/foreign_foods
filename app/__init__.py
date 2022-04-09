from flask import Flask

from .extensions import db, bootstrap, ckeditor

from .controllers.routes import site

def create_app(config_file="settings.py"):
    app = Flask(__name__)

    app.config.from_pyfile(config_file)

    bootstrap.init_app(app)
    db.init_app(app)
    # login_manager.init_app(app)
    
    app.register_blueprint(site)

    return app