from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from .db import db, environment, SCHEMA, add_prefix_for_prod


class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer())
    movie_id = db.Column(db.Integer())
    review =db.Column(db.String(255), nullable=False)
    stars =db.Column(db.Integer, nullable=False)

    user = relationship("User", back_populates="ranked_list")
    movie = relationship("Movie", back_populates="ranked_list")
    ranked_list = relationship("Ranked_List", back_populates="user")
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'movie_id': self.movie_id,
            'review':self.review,
            'stars':self.stars
        }
