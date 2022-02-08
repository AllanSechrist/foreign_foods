from flask import Flask, render_template, redirect, url_for
from flask_bootstrap import Bootstrap
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, SelectField
from wtforms.validators import DataRequired, Length, URL, ValidationError
import csv


app = Flask(__name__)
app.config['SECRET_KEY'] = 'randomnotsoRandomKey35828skdfjWaions'
Bootstrap(app)

class ValidateTime(object):
    def __init__(self, message=None):
        if not message:
            message = "You must enter a valid time"
        self.message = message
    def __call__(self, form, field):
        valid_data = ['0', '1', '2', '3','4','5','6','7','8','9','0',':','A','P','M']
        data = field.data
        for i in data:
            if i in valid_data:
                pass
            else:
                raise ValidationError(self.message)


class RestaurantForm(FlaskForm):
    restaurant = StringField('Restaurant Name', validators=[DataRequired()])
    style = StringField(label='Culture of Origin e.g. Mexican', validators=[DataRequired()])
    website = StringField(label='Website', validators=[DataRequired(), URL()])
    location = StringField(label='Restaurant Location on Google Maps by URL', validators=[DataRequired(), URL()])
    open_time = StringField(label="Opening Time e.g. 8AM", validators=[DataRequired(), Length(min=3, max=7), ValidateTime()])
    close_time = StringField(label="Closing Time e.g. 10:30PM", validators=[DataRequired(), Length(min=3, max=7), ValidateTime()])
    food_rating = SelectField(label="Food Rating", choices=[('✘'), ('😋'), ('😋😋'), ('😋😋😋'), ('😋😋😋😋'), ('😋😋😋😋😋')])
    price = SelectField(label="Pricing", choices=[('💸'), ('💸💸'), ('💸💸💸')])
    service = SelectField(label="Service", choices=[('👍'), ('👍👍'), ('👍👍👍'), ('👍👍👍👍'), ('👍👍👍👍👍')])
    submit = SubmitField('Submit')


class WishListForm(FlaskForm):
    restaurant = StringField('Restaurant Name', validators=[DataRequired()])
    style = StringField(label='Culture of Origin e.g. Mexican', validators=[DataRequired()])
    website = StringField(label='Website', validators=[DataRequired(), URL()])
    location = StringField(label='Restaurant Location on Google Maps by URL', validators=[DataRequired(), URL()])
    open_time = StringField(label="Opening Time e.g. 8AM", validators=[DataRequired(), Length(min=3, max=7), ValidateTime()])
    close_time = StringField(label="Closing Time e.g. 10:30PM", validators=[DataRequired(), Length(min=3, max=7), ValidateTime()])
    submit = SubmitField('Submit')
    

@app.route("/")
def home():
    return render_template('index.html')


@app.route("/add", methods=["GET", "POST"])
def add_restaurant():
    form = RestaurantForm()
    if form.validate_on_submit():
        new_restaurant = []
        new_restaurant.append(form.restaurant.data)
        new_restaurant.append(form.style.data)
        new_restaurant.append(form.website.data)
        new_restaurant.append(form.location.data)
        new_restaurant.append(form.open_time.data)
        new_restaurant.append(form.close_time.data)
        new_restaurant.append(form.food_rating.data)
        new_restaurant.append(form.price.data)
        new_restaurant.append(form.service.data)
        with open('restaurants-data.csv', 'a', encoding='utf8', newline='') as csv_file:
            writer_object = csv.writer(csv_file)
            writer_object.writerow(new_restaurant)
            csv_file.close()
        return redirect(url_for('restaurants'))

    return render_template('add.html', form=form)


@app.route('/restaurants')
def restaurants():
    with open('restaurants-data.csv', encoding='utf8', newline='') as csv_file:
        csv_data = csv.reader(csv_file, delimiter=',')
        rows = []
        for row in csv_data:
            rows.append(row)
    return render_template('restaurants.html', restaurants=rows)


@app.route('/wishlist-add', methods=["GET", "POST"])
def add_try_restaurant():
    form = WishListForm()
    if form.validate_on_submit():
        new_restaurant = []
        new_restaurant.append(form.restaurant.data)
        new_restaurant.append(form.style.data)
        new_restaurant.append(form.location.data)
        new_restaurant.append(form.open_time.data)
        new_restaurant.append(form.close_time.data)
        with open('wishlist-data.csv', 'a', encoding='utf8', newline='') as csv_file:
            writer_object = csv.writer(csv_file)
            writer_object.writerow(new_restaurant)
            csv_file.close()
        return redirect(url_for('restaurants'))


@app.route('/wishlist')
def wishlist():
    with open('wishlist-data.csv', encoding='utf8', newline='') as csv_file:
        csv_data = csv.reader(csv_file, delimiter=',')
        rows = []
        for row in csv_data:
            rows.append(row)
    return render_template('wishlist.html', wishlist=rows)


if __name__=='__main__':
    app.run(debug=True)