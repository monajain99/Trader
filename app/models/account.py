from .db import db
from .user import User
from .trade import Trade

class Account(db.Model):
    __tablename__ = 'account'

    id = db.Column(db.Integer, primary_key=True)
    balance = db.Column(db.Integer, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'users.id'), nullable=False, unique=True)
    # trade_id = db.Column(db.Integer, db.ForeignKey(
    #     'trade.id'), nullable=False)

    user = db.relationship('User', back_populates='account' ) #
    
    trade = db.relationship('Trade', lazy=True)
    
    def __init__(self,balance, user_id):
        self.balance = balance
        self.user_id = user_id
        # self.trade_id = trade_id

    def to_dict(self):
        return {
        "id": self.id,
        "balance": self.balance,
        "user_id": self.user_id,
        # "trade_id": self.trade_id
        }
