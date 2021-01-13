from .db import db
from .user import User

class Trade(db.Model):
    __tablename__ = 'trades'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=True)
    ticker = db.Column(db.String, nullable=True)
    volume = db.Column(db.Integer, nullable=True)
    price = db.Column(db.Float, nullable=True)
    transaction_date = db.Column(db.Integer, nullable=True)
    stock_id = db.Column(db.Integer, db.ForeignKey('stocks.id'), nullable=False)
    account_id = db.Column(db.Integer, db.ForeignKey(
        'account.id'), nullable=False)

    # user = db.relationship('User', back_populates='trade' )
    
    stock = db.relationship('Stock', back_populates="trades", lazy=True) ##
    
    # account = db.relationship('Account', back_populates='user' )
    
    # def __init__(self, name, ticker, volume, price, transaction_date, stock_id, account_id):
    #     self.name = name
    #     self.ticker = ticker
    #     self.volume = volume
    #     self.price = price
    #     self.transaction_date = transaction_date
    #     self.account_id = account_id
    #     self.stock_id = stock_id


    def to_dict(self):
        return {
        "id": self.id,
        "name": self.name,
        "ticker": self.ticker,
        "volume": self.volume,
        "price": self.price,
        "account_id": self.account_id,
        "stock_id": self.stock_id,
        "transaction_date": self.transaction_date
        }


