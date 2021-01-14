from flask import Blueprint, jsonify, session, request
from app.models import Trade, User, Stock, Account
# from app.forms import Trade
# from app.forms import  AddAccount
from app.models import db

trade_routes = Blueprint('trade', __name__)


@trade_routes.route('/<int:id>', methods=['GET'])
def getTrade(id):
    trades = Trade.query.filter(Trade.account_id == id).all()
    if (trades):
        return {'trade_items': [trade.to_dict() for trade in trades]}
    return "No trades"

@trade_routes.route('/', methods=['POST'])
def addTrade():
    data = request.json
    name=data["name"]
    ticker=data["ticker"]
    volume=data["volume"]
    price=data["price"]
    transaction_date=data["transaction_date"]
    stock_id=data["stock_id"]
    account_id=data["account_id"]
        
    trade = Trade(
        name=name,
        ticker=ticker,
        volume=volume,
        price=price,
        transaction_date=transaction_date,
        stock_id=stock_id,
        account_id=account_id
    )
    db.session.add(trade)
    db.session.commit()
    return trade.to_dict()


@trade_routes.route('/', methods=['DELETE'])
def deleteTrade():
    id = request.json["id"]
    trade = Trade.query.filter(Trade.id == id).first()
    if (trade):
        db.session.delete(trade)
        db.session.commit()
        return "Trade Deleted"
    return "no Trades"