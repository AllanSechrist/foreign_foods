from flask import render_template, redirect, url_for, abort
from flask_login import login_user, LoginManager, login_required, current_user, logout_user
from werkzeug.security import generate_password_hash, check_password_hash
from forms import *
from tables import *
from application import app, login_manager
from functools import wraps
from datetime import date


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


@app.route("/")
def home():
    return render_template('index.html')


@app.route('/admin')
def login():
    pass


@app.route("/add", methods=["GET", "POST"])
def add_restaurant():
    
    form = RestaurantForm()
    if form.validate_on_submit():
        new_restaurant = Restaurant(
            name=form.restaurant.data,
            style=form.style.data,
            website=form.website.data,
            location=form.location.data,
            open=(form.open_hour.data + ':' + form.open_mins.data + form.open_am_pm.data),
            close=(form.close_hour.data + ':' + form.close_mins.data + form.close_am_pm.data),
            food_rating=form.food_rating.data,
            price_rating=form.price.data,
            service_rating=form.service.data
        )
        db.session.add(new_restaurant)
        db.session.commit()
        return redirect(url_for('home'))
    return render_template('add.html', form=form)


@app.route('/restaurants')
def restaurants():
    header = ['Restaurant','Style','Website','Location','Open','Close','Food','Price','Service', 'blog']
    restaurants = Restaurant.query.all()
    return render_template('restaurants.html',header=header, restaurants=restaurants)


@app.route("/new-post", methods=["GET", "POST"])
# @admin_only
def add_new_post():
    form = BlogForm()
    # if form.validate_on_submit:
    #     new_post = BlogPost(
    #         title=form.title.data,
    #         subtitle=form.subtitle.data,
    #         body=form.body.data,
    #         author=current_user,
    #         date=date.today().strftime("%B %d, %Y")
    #     )
    #     db.session.add(new_post)
    #     db.session.commit()
    #     return redirect(url_for("restaurants"))
    return render_template("make-blog.html", form=form)


if __name__=='__main__':
    app.run(debug=True)