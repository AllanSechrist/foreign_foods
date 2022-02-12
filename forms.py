from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, SelectField
from wtforms.validators import DataRequired, URL


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
    close_hour = SelectField(label='Closing Time', choices=hour_choices)
    close_mins = SelectField(label='Select Minutes', choices=minute_choices)
    close_am_pm = SelectField(label='Select AM or PM', choices=am_pm)
    food_rating = SelectField(label="Food Rating", choices=[('✘'), ('😋'), ('😋😋'), ('😋😋😋'), ('😋😋😋😋'), ('😋😋😋😋😋')])
    price = SelectField(label="Pricing", choices=[('💸'), ('💸💸'), ('💸💸💸')])
    service = SelectField(label="Service", choices=[('👍'), ('👍👍'), ('👍👍👍'), ('👍👍👍👍'), ('👍👍👍👍👍')])
    submit = SubmitField('Submit')
