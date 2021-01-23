from flask import Blueprint, jsonify, session, request
from app.models import Trade, User, Stock, Account

from app.models import db

trade_routes = Blueprint('trade', __name__)

@trade_routes.route('/<int:id>', methods=['GET'])
def getTrade(id):
    account = Account.query.filter(Account.user_id == id).first()
    trades = Trade.query.filter(Trade.account_id == account.id).all()
    if (trades):
        return {'trade_items': [trade.to_dict() for trade in trades]}
    return "No trades"


@trade_routes.route('/', methods=['POST'])
def addTrade():
    data = request.json

    ticker=data["ticker"]
    volume=data["volume"]
    price=data["price"]
    transaction_date=data["transaction_date"]
    stock_id=data["stock_id"]
    account_id=data["account_id"]
    
    stock = Stock.query.filter(Stock.ticker == ticker).one()
    
    #if (stock):
    #   return stock.to_dict()
    #return "No stock"

    trade = Trade(
        name=stock.name,
        ticker=ticker,
        volume=volume,
        price=price,
        transaction_date=transaction_date,
        stock_id=stock_id,
        account_id=account_id
    )
    db.session.add(trade)
    
    account = Account.query.filter(Account.id == account_id).first()
    account.balance = int(account.balance) - (int(price) * int(volume))
    
   # new_balance = Account(account.balance, account.user_id)
    db.session.add(account)
    db.session.commit()










    db.session.commit()
    print("Vijay scess")
   # return trade.to_dict()
    return "Added succesufl"


@trade_routes.route('/', methods=['DELETE'])
def deleteTrade():
    print(request.json)
    id = request.json["id"]
    print(id)
    trade = Trade.query.filter(Trade.id == id).first()
    if (trade):
        account_id = trade.account_id
        price = trade.price
        volume = trade.volume
        account = Account.query.filter(
        Account.id == account_id).first()
        account.balance = int(account.balance) + (int(price) * int(volume))
        db.session.add(account)
        db.session.delete(trade)
        db.session.commit()
        return jsonify(account.balance)
    return "no Trade"