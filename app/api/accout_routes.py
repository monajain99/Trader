from flask import Blueprint, jsonify, session, request
from app.models import Account, User
from app.models import db

account_routes = Blueprint('account', __name__)


@account_routes.route('/<int:id>')
def user_account(id):
    balance = Account.query.filter(Account.user_id == id).first()
    return {'balance': [balance.to_dict()]}


@account_routes.route('/', methods=['POST'])
def add_account():
    user_id = request.json['currentUserId']
    balance = request.json['userBalance']

    new_balance = Account(balance, user_id)

    db.session.add(new_balance)
    db.session.commit()

    return {"id": new_balance.id}