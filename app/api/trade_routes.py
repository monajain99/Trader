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
    return "Please create a Trade"

@trade_routes.route('/', methods=['POST'])
def addTrade():
    print(request.json)
    data = request.json
    stock = Stock.query.filter_by(ticker=data['ticker'].upper()).one()
    trade = Trade(
        name=data['name'],
        price=data['price'],
        quantity=data['quantity'],
        stock=stock,
        account_id=data['account_id'])
    account = Account.query.get(data['account.id'])
    account.balance += data['type']
    db.session.add(trade)
    db.session.add(account)
    db.session.commit()
    return trade.to_dict()



# @trade_routes.route.route('/<int:id>', methods=['PUT'])
# def quick_load(id):
#     user_id = request.json['currentUserId']
#     weight = Trade.query.filter(Trade.user_id == user_id).one()
#     newTotal = request.json['newTotal']

#     weight.total_Cash = newTotal

#     db.session.add(weight)
#     db.session.commit()

    # return jsonify(weight.to_dict())