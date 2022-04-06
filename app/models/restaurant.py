

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
