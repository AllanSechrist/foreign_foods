from flask import render_template, redirect, Blueprint, flash, url_for, abort
from flask_login import login_user, login_required, current_user, logout_user
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps

from ..extensions import login_manager, db
from ..models.restaurant import Restaurant
from ..models.user import User
from ..models.blog_post import BlogPost
from ..models.forms import LoginForm, RestaurantForm, BlogForm, RegisterForm


site = Blueprint('site', __name__, template_folder='templates')


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


def admin_only(function):
    @wraps(function)
    def wrapper_function(*args, **kwargs):
        if not current_user.is_authenticated or current_user.id !=1:
            return abort(403)
        return function(*args, **kwargs)
    return wrapper_function


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

@site.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        email = form.email.data
        password = form.password.data

        user = User.query.filter_by(email=email).first()
        if not user:
            flash("That email does not have an account")
            return redirect(url_for('site.login'))
        elif not check_password_hash(user.password, password):
            flash("Password is wrong")
            return redirect(url_for('site.login'))
        else:
            login_user(user)
            return redirect(url_for('site.site_index'))
    return render_template('login.html', form=form, current_user=current_user)


@site.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('site.site_index'))


@site.route('/new-restaurant', methods=["GET", "POST"])
@admin_only
def add_restaurant():
    form = RestaurantForm()
    if form.validate_on_submit():
        new_restaurant = Restaurant(
            name = form.name.data,
            style = form.style.data,
            website = form.website.data,
            location = form.location.data,
            open = (form.open_hour.data + ':' + form.open_mins.data + form.open_am_pm.data),
            close = (form.close_hour.data + ':' + form.close_mins.data + form.close_am_pm.data),
            food_rating = form.food_rating.data,
            price_rating = form.price.data,
            service_rating = form.service.data
        )
        db.session.add(new_restaurant)
        db.session.commit()
        return redirect(url_for('site.site_index'))
    return render_template('add.html', form=form, current_user=current_user)
        