import os

SECRET_KEY = os.environ.get("SECRET_KEY")
SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'sqlite:///lists.db')
SQLALCHEMY_TRACK_MODIFICATIONS = False