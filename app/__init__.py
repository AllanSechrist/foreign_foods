from flask import Flask
from flask_cors import CORS


from .extensions import db, ma, bootstrap, ckeditor, login_manager, jwt



from .controllers.site import site
from .controllers.blog import blog

def create_app(config_file="settings.py"):
    app = Flask(__name__)

    app.config.from_pyfile(config_file)

    bootstrap.init_app(app)
    db.init_app(app)
    ma.init_app(app)
    login_manager.init_app(app)
    ckeditor.init_app(app)
    jwt.init_app(app)
    CORS(app)

    
    app.register_blueprint(site)
    app.register_blueprint(blog)

    return app