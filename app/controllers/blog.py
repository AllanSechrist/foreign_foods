from flask import render_template, redirect, Blueprint, url_for, abort, jsonify
from flask_login import login_user, login_required, current_user, logout_user
from datetime import date
from functools import wraps

from ..extensions import login_manager, db
from ..models.restaurant import Restaurant
from ..models.user import User
from ..models.blog_post import BlogPost
from ..models.forms import LoginForm, RestaurantForm, BlogForm, RegisterForm
from ..models.schemas import BlogPostSchema, UserSchema, RestaurantSchema


blog = Blueprint('blog', __name__, url_prefix='/blog', template_folder='templates')


def admin_only(function):
    @wraps(function)
    def wrapper_function(*args, **kwargs):
        if not current_user.is_authenticated or current_user.id !=1:
            return abort(403)
        return function(*args, **kwargs)
    return wrapper_function


@blog.route('/')
def all_blogs():
    blogs = BlogPost.query.all()
    blog_schema = BlogPostSchema(many=True)
    output = blog_schema.dump(blogs)
    return jsonify({"blog": output})
    # return render_template('all-blogs.html', posts=posts, current_user=current_user)


@blog.route('/<int:restaurant_id>', methods=["GET"])
def show_blog(restaurant_id):
    requested_restaurant = Restaurant.query.get(restaurant_id)
    blog_post = requested_restaurant.blog_post
    blog_schema = BlogPostSchema(many=True)
    output = blog_schema.dump(blog_post)
    return jsonify({"blog": output})
    # return render_template('blog.html', restaurant=requested_restaurant)


@blog.route("/new-blog/<int:restaurant_id>", methods=["POST"])
@admin_only
def add_new_post(restaurant_id):
    requested_restaurant = Restaurant.query.get(restaurant_id)
    if requested_restaurant:
        new_post = BlogPost(
            title = request.json.get("title", None),
            subtitle = request.json.get("subtitle", None),
            body = request.json.get("body", None),
            author = request.json.get("author", None),
            restaurant = request.json.get("restaurant", None),
            date = request.json.get("date", None),
        )
        db.session.add(new_post)
        db.session.commit()
    else:
        return jsonify({"msg": "Restaurant does not exsist"}), 404
    # form = BlogForm()
    # if form.validate_on_submit():
    #     new_post = BlogPost(
    #         title = form.title.data,
    #         subtitle = form.subtitle.data,
    #         body = form.body.data,
    #         author = current_user,
    #         restaurant = requested_restaurant,
    #         date = date.today().strftime("%B %d, %Y"),
    #     )
    #     db.session.add(new_post)
    #     db.session.commit()
    #     return redirect(url_for("site.restaurants"))
    # return render_template("make-blog.html", form=form, requested_restaurant=requested_restaurant, current_user=current_user)


@blog.route("/edit-blog/<int:blog_id>", methods=["GET", "POST"])
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
        return redirect(url_for("blog.show_blog", restaurant_id=blog.restaurant_id))

    return render_template("make-blog.html", form=edit_form, current_user=current_user)


# @blog.route("/edit-restaurant/<int:restaurant_id>", methods=['GET', 'POST'])
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


@blog.route('/delete-blog/<int:blog_id>', methods=["GET", "POST"])
@admin_only
def delete_blog(blog_id):
    blog_to_delete = BlogPost.query.get(blog_id)
    db.session.delete(blog_to_delete)
    db.session.commit()
    return redirect(url_for('blog.all_blogs'))