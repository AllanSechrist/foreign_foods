from flask import render_template, redirect, Blueprint


site = Blueprint('site', __name__, template_folder='templates')


@site.route('/')
def site_index():
    return render_template('testindex.html')