import os

SECRET_KEY = os.environ.get("SECRET_KEY", "thisisthesecretkey")
JWT_SECRET = os.environ.get("JWT_SECRET", "thisisatotallysecretkey")
SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'sqlite:///restaurants.db')
SQLALCHEMY_TRACK_MODIFICATIONS = False