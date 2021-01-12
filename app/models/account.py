from .db import db
from .user import User
from .portfolio import Portfolio

class Account(db.Model):
    __tablename__ = 'account'

    id = db.Column(db.Integer, primary_key=True)
    balance = db.Column(db.Integer, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'users.id'), nullable=False, unique=True)
    portfolio_id = db.Column(db.Integer, db.ForeignKey(
        'portfolio.id'), nullable=False)

    user = db.relationship('User', back_populates='account' )
    
    portfolio = db.relationship('Portfolio', back_populates='user')
    
    def __init__(self, balance, user_id, portfolio_id):
        self.balance = balance
        self.user_id = user_id
        self.portfolio_id = portfolio_id

    def to_dict(self):
        return {
        "id": self.id,
        "balance": self.balance,
        "user_id": self.user_id,
        "portfolio_id": self.portfolio_id
        }
