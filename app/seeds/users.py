from werkzeug.security import generate_password_hash
from app.models import db, User, Trade

# Adds a demo user, you can add other users here if you want
def seed_users():

    demo = User(username='Demo', email='demo@aa.io',
                password='password', about='Portfolio Manger delivering gains consistently',
                buying_power=100000, full_name='Robin Hood',
                image_url='https://static01.nyt.com/images/2017/09/12/us/12xp-monkey1/12xp-monkey1-jumbo.jpg?quality=90&auto=webp' )

    db.session.add(demo)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users CASCADE')
    db.session.commit()
