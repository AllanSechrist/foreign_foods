from flask import render_template, redirect, Blueprint
from flask_login import login_user, login_required, current_user, logout_user

from ..extensions import login_manager
from ..models.restaurant import Restaurant
from ..models.user import User
from ..models.blog_post import BlogPost
from ..models.forms import LoginForm, RestaurantForm, BlogForm, RegisterForm


site = Blueprint('site', __name__, template_folder='templates')


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


@site.route('/')
def site_index():
    return render_template('index.html')


@site.route('/restaurants')
def restaurants():
    header = ['Restaurant','Style','Website','Location','Open','Close','Food','Price','Service', 'blog']
    restaurants = Restaurant.query.all()
    return render_template('restaurants.html',header=header, restaurants=restaurants, current_user=current_user)


@site.route('/about')
def about():
    return render_template('about.html')
