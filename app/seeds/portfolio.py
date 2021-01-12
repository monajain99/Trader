from app.models import db, Portfolio, User

def seed_portfolio():
    demo = Portfolio(name='TESLA', ticker='TSLA', volume='100', price='100', transaction_date='20200110', user_id=User.query.filter_by(username='Demo').first().id)

    db.session.add(demo)

    db.session.commit()


def undo_portfolio():
    db.session.execute('TRUNCATE portfolio;')
    db.session.commit()