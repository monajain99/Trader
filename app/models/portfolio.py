from .db import db
from .user import User

class Portfolio(db.Model):
    __tablename__ = 'portfolio'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=True)
    ticker = db.Column(db.String, nullable=True)
    volume = db.Column(db.Integer, nullable=True)
    price = db.Column(db.Float, nullable=True)
    transaction_date = db.Column(db.Integer, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'users.id'), nullable=False)
    account_id = db.Column(db.Integer, db.ForeignKey(
        'account.id'), nullable=False)

    user = db.relationship('User', back_populates='portfolio' )
    
    account = db.relationship('Account', back_populates='user' )
    
    def __init__(self, name, ticker, volume, price, transaction_date, user_id, account_id):
        self.user_id = user_id
        self.name = name
        self.ticker = ticker
        self.volume = volume
        self.price = price
        self.account_id = account_id
        self.transaction_date = transaction_date


    def to_dict(self):
        return {
        "id": self.id,
        "name": self.name,
        "ticker": self.ticker,
        "volume": self.volume,
        "price": self.price,
        "user_id": self.user_id,
        "account_id": self.account_id,
        "transaction_date": self.transaction_date
        }


