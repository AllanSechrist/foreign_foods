from tkinter.tix import Select
from flask import Flask, render_template, redirect, url_for
from flask_bootstrap import Bootstrap
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, SelectField
from wtforms.validators import DataRequired, Length, URL, ValidationError
import csv


app = Flask(__name__)
app.config['SECRET_KEY'] = 'randomnotsoRandomKey35828skdfjWaions'
Bootstrap(app)


class RestaurantForm(FlaskForm):
    hour_choices = [('5'), ('6'), ('7'), ('8'), ('9'), ('10'), ('11'), ('12'), ('1'), ('2'), ('3'), ('4')]
    am_pm = [("AM"), ("PM")]
    minute_choices = [('00'), ('15'), ('30'), ('45')]
    restaurant = StringField('Restaurant Name', validators=[DataRequired()])
    style = StringField(label='Culture of Origin e.g. Mexican', validators=[DataRequired()])
    website = StringField(label='Website', validators=[DataRequired(), URL()])
    location = StringField(label='Restaurant Location on Google Maps by URL', validators=[DataRequired(), URL()])
    open_hour = SelectField(label='Opening Time', choices=hour_choices)
    open_mins = SelectField(label='Select Minutes', choices=minute_choices)
    open_am_pm = SelectField(label='Select AM or PM', choices=am_pm)
    close_time = SelectField(label='Closing Time', choices=hour_choices)
    close_mins = SelectField(label='Select Minutes', choices=minute_choices)
    close_am_pm = SelectField(label='Select AM or PM', choices=am_pm)
    food_rating = SelectField(label="Food Rating", choices=[('✘'), ('😋'), ('😋😋'), ('😋😋😋'), ('😋😋😋😋'), ('😋😋😋😋😋')])
    price = SelectField(label="Pricing", choices=[('💸'), ('💸💸'), ('💸💸💸')])
    service = SelectField(label="Service", choices=[('👍'), ('👍👍'), ('👍👍👍'), ('👍👍👍👍'), ('👍👍👍👍👍')])
    submit = SubmitField('Submit')


class WishListForm(FlaskForm):
    hour_choices = [('5'), ('6'), ('7'), ('8'), ('9'), ('10'), ('11'), ('12'), ('1'), ('2'), ('3'), ('4')]
    am_pm = [("AM"), ("PM")]
    minute_choices = [('00'), ('15'), ('30'), ('45')]
    restaurant = StringField('Restaurant Name', validators=[DataRequired()])
    style = StringField(label='Culture of Origin e.g. Mexican', validators=[DataRequired()])
    website = StringField(label='Website', validators=[DataRequired(), URL()])
    location = StringField(label='Restaurant Location on Google Maps by URL', validators=[DataRequired(), URL()])
    open_hour = SelectField(label='Opening Time', choices=hour_choices)
    open_mins = SelectField(label='Select Minutes', choices=minute_choices)
    open_am_pm = SelectField(label='Select AM or PM', choices=am_pm)
    close_time = SelectField(label='Closing Time', choices=hour_choices)
    close_mins = SelectField(label='Select Minutes', choices=minute_choices)
    close_am_pm = SelectField(label='Select AM or PM', choices=am_pm)
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
        new_restaurant.append(form.open_hour.data + ":" + form.open_mins.data + form.open_am_pm.data)
        new_restaurant.append(form.close_time.data + ":" + form.close_mins.data + form.close_am_pm.data)
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
        new_restaurant.append(form.open_hour.data + ":" + form.open_mins.data + form.open_am_pm.data)
        new_restaurant.append(form.close_time.data + ":" + form.close_mins.data + form.close_am_pm.data)
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