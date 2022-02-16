from application import db
from sqlalchemy.orm import relationship
from flask_login import UserMixin


class User(UserMixin, db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    name = db.Column(db.String(100))
    posts = relationship("BlogPost", back_populates='author')
# db.create_all()



class Restaurant(db.Model):
    __tablename__='restaurants'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    style = db.Column(db.String(100), nullable=False)
    website = db.Column(db.String(200))
    location = db.Column(db.String(500), nullable=False)
    open = db.Column(db.String(10), nullable=False)
    close = db.Column(db.String(10), nullable=False)
    food_rating = db.Column(db.String(10), nullable=False)
    price_rating = db.Column(db.String(10), nullable=False)
    service_rating = db.Column(db.String(10), nullable=False)
    blog_post = relationship("BlogPost", back_populates='restaurant')
# db.create_all()    


class BlogPost(db.Model):
    __tablename__="blog_posts"
    id = db.Column(db.Integer, primary_key=True)
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.id'))
    author = relationship("User", back_populates='posts')
    title = db.Column(db.String(250), unique=True, nullable=False)
    subtitle = db.Column(db.String(250), nullable=False)
    date = db.Column(db.String(250), nullable=False)
    body = db.Column(db.Text, nullable=False)
    restaurant = relationship('Restaurant', back_populates='blog_post')
# db.create_all()


