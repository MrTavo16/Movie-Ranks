from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from .db import db, environment, SCHEMA, add_prefix_for_prod


class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey(add_prefix_for_prod("users.id")))
    movie_id = db.Column(db.Integer(), db.ForeignKey(add_prefix_for_prod("movies.movie_id")))
    username = db.Column(db.String(255))
    review =db.Column(db.String(255), nullable=False)
    stars =db.Column(db.Integer, nullable=False)

    user = relationship("User", back_populates="review")
    movie = relationship("Movie", back_populates="review")
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'movie_id': self.movie_id,
            'username':self.username,
            'review':self.review,
            'stars':self.stars
        }
