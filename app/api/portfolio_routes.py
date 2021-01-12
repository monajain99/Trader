from flask import Blueprint, jsonify, session, request
from app.models import Portfolio, User
from app.forms import AddTrade, AddPortfolio
from app.models import db

portfolio_routes = Blueprint('portfolio', __name__)


@portfolio_routes.route('/<int:id>', methods=['GET'])
def getPortfolio(id):
    portfolio = Portfolio.query.filter(Portfolio.user_id == id).first()
    if (portfolio):
        return {'portfolio_items': [portfolio.to_dict()]}
    return "Please create a Portfolio"


@portfolio_routes.route('', methods=['POST'])
def addTrade():
    form = AddTrade()
    if form.validate_on_submit():
        trade = Trade(


        ) 
    portfolio = request.json['addPortfolio']

    new_portfolio = Portfolio(portfolio, user_id)

    db.session.add(new_portfolio)
    db.session.commit()

    return {"id": new_portfolio.id}



# @portfolio_routes.route.route('/<int:id>', methods=['PUT'])
# def quick_load(id):
#     user_id = request.json['currentUserId']
#     weight = Portfolio.query.filter(Portfolio.user_id == user_id).one()
#     newTotal = request.json['newTotal']

#     weight.total_Cash = newTotal

#     db.session.add(weight)
#     db.session.commit()

    return jsonify(weight.to_dict())