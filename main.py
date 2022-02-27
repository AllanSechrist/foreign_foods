from click import style
from flask import render_template, redirect, url_for, abort, flash
from flask_login import login_user, login_required, current_user, logout_user
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


@app.route("/about")
def about():
    return render_template('about.html')


@app.route('/register', methods=["GET", "POST"])
def register():
    form = RegisterForm()
    if form.validate_on_submit():
        if User.query.filter_by(email=form.email.data).first():
            flash("That email is in use")
            return redirect(url_for('login'))
        
        hash_and_salted_password = generate_password_hash(
            form.password.data,
            method='pbkdf2:sha256',
            salt_length=8
        )
        new_user = User(
            email=form.email.data,
            name=form.name.data,
            password=hash_and_salted_password
        )
        db.session.add(new_user)
        db.session.commit()
        login_user(new_user)
        return redirect(url_for('home'))

    return render_template('register.html', form=form, current_user=current_user)


@app.route('/admin', methods=["GET", "POST"])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        email = form.email.data
        password = form.password.data

        user = User.query.filter_by(email=email).first()
        if not user:
            flash("That email does not have an account")
            return redirect(url_for('home'))
        elif not check_password_hash(user.password, password):
            flash("Password is wrong")
            return redirect(url_for('login'))
        else:
            login_user(user)
            return redirect(url_for('home'))
    return render_template('login.html', form=form, current_user=current_user)


@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('home'))


@app.route("/add", methods=["GET", "POST"])
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
        return redirect(url_for('home'))
    return render_template('add.html', form=form, current_user=current_user)


@app.route('/restaurants')
def restaurants():
    header = ['Restaurant','Style','Website','Location','Open','Close','Food','Price','Service', 'blog']
    restaurants = Restaurant.query.all()
    return render_template('restaurants.html',header=header, restaurants=restaurants, current_user=current_user)


@app.route('/blog')
def all_blogs():
    blogs = BlogPost.query.all()
    return render_template('all-blogs.html', blogs=blogs, current_user=current_user)


@app.route('/blog/<int:restaurant_id>')
def show_blog(restaurant_id):
    requested_restaurant = Restaurant.query.get(restaurant_id)
    return render_template('blog.html', restaurant=requested_restaurant)


@app.route("/new-blog/<int:restaurant_id>", methods=["GET", "POST"])
@admin_only
def add_new_post(restaurant_id):
    form = BlogForm()
    requested_restaurant = Restaurant.query.get(restaurant_id)
    if form.validate_on_submit():
        new_post = BlogPost(
            title = form.title.data,
            subtitle = form.subtitle.data,
            body = form.body.data,
            author = current_user,
            restaurant = requested_restaurant,
            date = date.today().strftime("%B %d, %Y"),
        )
        db.session.add(new_post)
        db.session.commit()
        return redirect(url_for("restaurants"))
    return render_template("make-blog.html", form=form, requested_restaurant=requested_restaurant, current_user=current_user)


@app.route("/edit-blog/<int:blog_id>", methods=["GET", "POST"])
@admin_only
def edit_blog(blog_id):
    blog = BlogPost.query.get(blog_id)
    edit_form = BlogForm(
        title = blog.title,
        subtitle = blog.subtitle,
        author = blog.author,
        body = blog.body
    )
    if edit_form.validate_on_submit():
        blog.title = edit_form.title.data
        blog.subtitle = edit_form.subtitle.data
        blog.body = edit_form.body.data
        db.session.commit()
        return redirect(url_for("show_blog", restaurant_id=blog.restaurant_id))

    return render_template("make-blog.html", form=edit_form, current_user=current_user)


# @app.route("/edit-restaurant/<int:restaurant_id>", methods=['GET', 'POST'])
# @admin_only
# def edit_restaurant(restaurant_id):
#     restaurant = Restaurant.query.get(restaurant_id)
#     edit_form = RestaurantForm(
#         name = restaurant.name,
#         style = restaurant.style,
#         website = restaurant.website,
#         location  = restaurant.location,
#         open_hour = restaurant.open,
#         close = restaurant.close,
#         food_rating = restaurant.food_rating,
#         price_rating = restaurant.price_rating,
#         service_rating = restaurant.service_rating,
#     )


@app.route('/delete-blog/<int:blog_id>', methods=["GET", "POST"])
@admin_only
def delete_blog(blog_id):
    blog_to_delete = BlogPost.query.get(blog_id)
    db.session.delete(blog_to_delete)
    db.session.commit()
    return redirect(url_for('restaurants'))


if __name__=='__main__':
    app.run(host='0.0.0.0', port=5000)