from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from app.models import User, Portfolio

class AddTrade(FlaskForm):
    volume = IntegerField('Quantity', validators=[DataRequired()])
    ticker = StringField('Stock Symbol', validators=[DataRequired()])
    price = IntegerField('Price', validators=[DataRequired()])
    
class AddPortfolio(FlaskForm):
    volume = IntegerField('Quantity', validators=[DataRequired()])
    ticker = StringField('Stock Symbol', validators=[DataRequired()])
    price = IntegerField('Price', validators=[DataRequired()])
    