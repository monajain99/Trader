from flask import Blueprint, jsonify
import alpaca_trade_api as tradeapi
from app.config import Config
from app.models import Stock


stock_routes = Blueprint('stocks', __name__)

@stock_routes.route('/')
def stocks():
    stocks = Stock.query.all()
    return {"stocks": [stock.to_dict() for stock in stocks]}


# @stock_routes.route('/add', methods=[POST, DELETE, UPDATE])
# def addStocks(id):
#     stock = Stock.query.get(id)
#     return stock.to_dict()



@stock_routes.route('/asset')
def getStocks():
    api = tradeapi.REST(Config.API_KEY, Config.SECRET_KEY, base_url=Config.API_URL)
    print("stock route hit")
    assets = api.list_assets()
    # return json.loads(assests.content)
    stockList = {}
    for asset in assets:
        try:
            if asset.status == 'active' and asset.tradable:
              stockList[asset.symbol]=(asset.name,asset.exchange)
              #print({asset.symbol}, {asset.name}, {asset.exchange})
        except Exception as e:
            print(asset.symbol)
            return (e)
    return(stockList)


@stock_routes.route('/asset/<string:ticker>')
def price(ticker):
    priceList = {}
    api = tradeapi.REST(Config.API_KEY, Config.SECRET_KEY, base_url=Config.API_URL)
    barset = api.get_barset('AAPL', 'day', limit=5)
    aapl_bars = barset['AAPL']
    print(aapl_bars)
    week_open = aapl_bars[0].o
    week_close = aapl_bars[-1].c
    percent_change = (week_close - week_open)/week_open
    return ('^^^^^^^^^^^^^^^^^^^^^^^^^^^^AAPL moved{}%'.format(percent_change))




