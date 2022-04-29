import os

SECRET_KEY = os.environ.get("SECRET_KEY", "thisisthesecretkey")
SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'sqlite:///restaurants.db')
SQLALCHEMY_TRACK_MODIFICATIONS = False