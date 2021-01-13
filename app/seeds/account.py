from app.models import db, Account, User

def seed_account():
    demo = Account( balance=1000, user_id=User.query.filter_by(username='Demo').first().id)

    db.session.add(demo)

    db.session.commit()


def undo_account():
    db.session.execute('TRUNCATE account CASCADE;')
    db.session.commit()