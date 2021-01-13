from app.models import db, Trade, User, Account, Stock

def seed_trade():
    # demo=Trade(name='Tesla', ticker='TSLA', volume='100', price='100', transaction_date='20200110', account_id=1, user_id=User.query.filter_by(username='Demo').first().id)
    # demo1=Trade(name='Apple', ticker='APPL', volume='100', price='100', transaction_date='20200110', account_id=1, user_id=User.query.filter_by(username='Demo').first().id)
    # demo2=Trade(name='Facebook', ticker='FB', volume='100', price='100', transaction_date='20200110', account_id=1, user_id=User.query.filter_by(username='Demo').first().id)
    # demo3=Trade(name='Amazon', ticker='AMZN', volume='100', price='100', transaction_date='20200110', account_id=1, user_id=User.query.filter_by(username='Demo').first().id)
    
    demo=Trade(id=1, name='Tesla', ticker='TSLA', volume='100', price='100', transaction_date='20200110', account_id=5, stock_id=1)
    demo1=Trade(name='Facebook', ticker='FB', volume='100', price='100', transaction_date='20200110', account_id=5, stock_id=10)
    demo2=Trade(name='Tesla', ticker='TSLA', volume='100', price='100', transaction_date='20200110', account_id=5, stock_id=1)
    demo3=Trade(name='Tesla', ticker='TSLA', volume='100', price='100', transaction_date='20200110', account_id=5, stock_id=1)

    
    db.session.add(demo)
    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)

    db.session.commit()


def undo_trade():
    db.session.execute('TRUNCATE trade CASCADE;')
    db.session.commit()