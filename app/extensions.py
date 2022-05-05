from flask_sqlalchemy import SQLAlchemy
from flask_bootstrap import Bootstrap
from flask_login import LoginManager
from flask_ckeditor import CKEditor
from flask_marshmallow import Marshmallow


db = SQLAlchemy()
ma = Marshmallow()
bootstrap = Bootstrap()
ckeditor = CKEditor()
login_manager = LoginManager()


