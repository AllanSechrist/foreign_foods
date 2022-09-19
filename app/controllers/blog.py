from flask import Blueprint, jsonify, request
from datetime import date
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity

from ..extensions import db
from ..models.restaurant import Restaurant
from ..models.user import User
from ..models.blog_post import BlogPost
from ..models.schemas import BlogPostSchema


blog = Blueprint("blog", __name__, url_prefix="/blog", template_folder="templates")


@blog.route("/")
def all_blogs():
    blogs = BlogPost.query.all()
    blog_schema = BlogPostSchema(many=True)
    output = blog_schema.dump(blogs)
    return jsonify({"blog": output})


@blog.route("/new-blog/<int:restaurant_id>", methods=["POST"])
@jwt_required()
def add_new_post(restaurant_id):
    requested_restaurant = Restaurant.query.get(restaurant_id)
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    if requested_restaurant:
        new_post = BlogPost(
            title=request.json.get("title", None),
            subtitle=request.json.get("subtitle", None),
            body=request.json.get("body", None),
            author=user,
            restaurant=requested_restaurant,
            date=date.today().strftime("%B %d, %Y"),
        )
        db.session.add(new_post)
        db.session.commit()
        return jsonify({"msg": "Blog Posted!"}), 200
    else:
        return jsonify({"msg": "Restaurant does not exsist"}), 404


# @blog.route("/get-blog/<int:blog_id>", methods=["GET"])
# def get_blog(blog_id):
#     blog_to_get = BlogPost.query.get(blog_id)
#     blog_schema = BlogPostSchema()
#     output = blog_schema.dump(blog_to_get)
#     return jsonify({"blog": output})


@blog.route("/edit-blog/<int:blog_id>", methods=["GET", "PATCH"])
@jwt_required()
def edit_blog(blog_id):
    blog_to_update = BlogPost.query.get(blog_id)

    if request.method == "GET":
        blog_schema = BlogPostSchema()
        output = blog_schema.dump(blog_to_update)
        return jsonify({"blog": output})

    if request.method == "PATCH" and blog_to_update:
        blog_to_update.title = request.json.get("title", None)
        blog_to_update.subtitle = request.json.get("subtitle", None)
        blog_to_update.body = request.json.get("body", None)
        db.session.commit()
        return jsonify({"msg": "Blog has been edited!"}), 200

    return jsonify({"msg": "Blog does not exsist!"}), 401


@blog.route("/delete-blog/<int:blog_id>", methods=["DELETE"])
@jwt_required()
def delete_blog(blog_id):
    blog_to_delete = BlogPost.query.get(blog_id)
    if blog_to_delete:
        db.session.delete(blog_to_delete)
        db.session.commit()
        return jsonify({"msg": "Blog Deleted!"}), 200
    else:
        return jsonify({"msg": "Blog does not exist"}), 404
