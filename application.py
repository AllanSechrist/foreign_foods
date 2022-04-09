# from flask import Flask
# from flask_bootstrap import Bootstrap
# from flask_sqlalchemy import SQLAlchemy
# from flask_login import LoginManager
# from flask_ckeditor import CKEditor
# # from secret_keys import SECRET_KEY
# import os

# app = Flask(__name__)
# login_manager = LoginManager()
# login_manager.init_app(app)


# app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
# ckeditor= CKEditor(app)
# Bootstrap(app)

# #connect to database
# app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///restaurant.db')
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# db = SQLAlchemy(app)