from werkzeug.security import generate_password_hash
from app.models import db, Stock

# Adds a demo user, you can add other users here if you want

def seed_stock():

    demo1 = Stock(id=1, name='Tesla', ticker='TSLA')
    demo2 = Stock(name='Facebook', ticker='FB')
    demo3 = Stock(name='Nio', ticker='NIO')
    demo4 = Stock(name='Alibaba', ticker='BABA')
    demo5 = Stock(name='Amc Entertainment', ticker='AMC')
    demo6 = Stock(name='Disney', ticker='DIS')
    demo7 = Stock(name='Vigin Galatic', ticker='SPCE')
    demo8 = Stock(name='Apple', ticker='APPL')
    
    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.add(demo5)
    db.session.add(demo6)
    db.session.add(demo7)
    db.session.add(demo8)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_stocks():
    db.session.execute('TRUNCATE stocks CASCADE')
    db.session.commit()