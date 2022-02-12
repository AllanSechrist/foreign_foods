from flask import Flask
from flask_bootstrap import Bootstrap
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_ckeditor import CKEditor

app = Flask(__name__)
login_manager = LoginManager()
login_manager.init_app(app)


app.config['SECRET_KEY'] = 'randomnotsoRandomKey35828skdfjWaions'
ckeditor= CKEditor(app)
Bootstrap(app)

#connect to database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///restaurants.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)