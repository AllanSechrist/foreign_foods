from flask import render_template, redirect, Blueprint, flash, url_for, abort, jsonify, request
from flask_login import login_user, login_required, current_user, logout_user
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

from ..extensions import login_manager, db
from ..models.blog_post import BlogPost
from ..models.user import User
from ..models.restaurant import Restaurant
from ..models.forms import LoginForm, RestaurantForm, BlogForm, RegisterForm
from ..models.schemas import BlogPostSchema, UserSchema, RestaurantSchema


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


@site.route('/restaurants', methods=["GET"])
def restaurants():
    restaurants = Restaurant.query.all()
    restaurant_schema = RestaurantSchema(many=True)
    output = restaurant_schema.dump(restaurants)
    return jsonify({'restaurant' : output})
    

@site.route('/about')
def about():
    return render_template('about.html')


@site.route('/login', methods=['POST'])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"msg": "Email does not exist"}), 401
    elif not check_password_hash(user.password, password):
        return jsonify({"msg": "Password is wrong"}), 401
    else:
        access_token = create_access_token(identity=email)
        return jsonify(access_token=access_token)


@site.route('/logout')
def logout():
    logout_user()
    # return redirect(url_for('site.site_index'))
    return jsonify({"msg": "User has been logged out"})


@site.route('/new-restaurant', methods=["GET", "POST"])
@jwt_required()
def add_restaurant():
    new_restaurant = Restaurant(
        name = request.json.get("name", None),
        style = request.json.get("style", None),
        website = request.json.get("website", None),
        location = request.json.get("location", None),
        open = request.json.get("open", None),
        close = request.json.get("close", None),
        food_rating = request.json.get("food_rating", None),
        price_rating = request.json.get("price_rating", None),
        service_rating = request.json.get("service_rating", None),
        )
    db.session.add(new_restaurant)
    db.session.commit()
    return jsonify({"msg": "Restaurant Created!"}), 200
    # form = RestaurantForm()
    # if form.validate_on_submit():
    #     new_restaurant = Restaurant(
    #         name = form.name.data,
    #         style = form.style.data,
    #         website = form.website.data,
    #         location = form.location.data,
    #         open = (form.open_hour.data + ':' + form.open_mins.data + form.open_am_pm.data),
    #         close = (form.close_hour.data + ':' + form.close_mins.data + form.close_am_pm.data),
    #         food_rating = form.food_rating.data,
    #         price_rating = form.price.data,
    #         service_rating = form.service.data
    #     )
    #     db.session.add(new_restaurant)
    #     db.session.commit()
    #     return redirect(url_for('site.site_index'))
    # return render_template('add.html', form=form, current_user=current_user)
        