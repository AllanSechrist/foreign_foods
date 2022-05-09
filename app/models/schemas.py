from .blog_post import BlogPost
from .restaurant import Restaurant
from .user import User
from ..extensions import ma



class BlogPostSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = BlogPost
        load_instance=True
        

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_instance=True
        

class RestaurantSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Restaurant
        load_instance=True      