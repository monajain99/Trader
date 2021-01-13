from .db import db
# from .watchlist import WatchList
class Stock(db.Model):
  __tablename__ = 'stocks'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(40), nullable=False, unique=True)
  ticker = db.Column(db.String(20), nullable=False, unique=True)

  trades = db.relationship('Trade', back_populates="stock", lazy=True) #
  # watchlists = db.relationship('WatchList', secondary=association_table, lazy=True)
  
  
  def to_dict(self):
    return {
        "id": self.id,
        "name": self.name,
        "ticker": self.ticker,
    }