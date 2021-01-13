from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  username = db.Column(db.String(40), nullable = False, unique = True)
  full_name = db.Column(db.String(100), nullable = False, unique = True)
  email = db.Column(db.String(255), nullable = False, unique = True)
  hashed_password = db.Column(db.String(255), nullable = False)
  buying_power = db.Column(db.Integer, nullable=True)
  image_url = db.Column(db.String(300), nullable=True)
  about = db.Column(db.String(2000), nullable=True)
  
  account = db.relationship('Account', back_populates='user', cascade="all, delete, delete-orphan") #
  # trade = db.relationship('Portfolio', back_populates='user', cascade="all, delete, delete-orphan")

  # watchlist = db.relationship('Watchlist', back_populates='user', cascade="all, delete, delete-orphan")
  
  @property
  def password(self):
    return self.hashed_password


  @password.setter
  def password(self, password):
    self.hashed_password = generate_password_hash(password)


  def check_password(self, password):
    return check_password_hash(self.password, password)


  def to_dict(self):
    return {
      "id": self.id,
      "username": self.username,
      "email": self.email,
      "buying_power": self.buying_power,
      "image_url": self.image_url,
      "about": self.about,
      "full_name": self.full_name
    }
