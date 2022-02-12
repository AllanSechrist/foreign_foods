from flask import render_template, redirect, url_for
from forms import RestaurantForm
from tables import *
from application import app



@app.route("/")
def home():
    return render_template('index.html')


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
    header = ['Restaurant','Style','Website','Location','Open','Close','Food','Price','Service']
    restaurants = Restaurant.query.all()
    return render_template('restaurants.html',header=header, restaurants=restaurants)

# @app.route('/restaurants')
# def restaurants():
#     with open('restaurants-data.csv', encoding='utf8', newline='') as csv_file:
#         csv_data = csv.reader(csv_file, delimiter=',')
#         rows = []
#         for row in csv_data:
#             rows.append(row)
#     return render_template('restaurants.html', restaurants=rows)


if __name__=='__main__':
    app.run(debug=True)