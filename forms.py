from ast import Pass
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, SelectField, PasswordField
from wtforms.validators import DataRequired, URL
from flask_ckeditor import CKEditorField


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


class LoginForm(FlaskForm):
    email = StringField('email', validators=[DataRequired()])
    password = PasswordField('password', validators=[DataRequired()])
    submit = SubmitField("Login")


class BlogForm(FlaskForm):
    title = StringField("Blog Post Title", validators=[DataRequired()])
    subtitle = StringField("Subtitle", validators=[DataRequired()])
    body = CKEditorField("Content", validators=[DataRequired()])
    submit = SubmitField("Submit")


class RegisterForm(FlaskForm):
    email = StringField("Email", validators=[DataRequired()])
    password = PasswordField("Password", validators=[DataRequired()])
    name = StringField("Name", validators=[DataRequired()])
    submit = SubmitField("Sign Me Up!")