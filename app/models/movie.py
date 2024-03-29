from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from .db import db, environment, SCHEMA, add_prefix_for_prod

class Movie(db.Model):
    __tablename__ = "movies"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer(), primary_key = True)
    movie_id = db.Column(db.Integer(), nullable = False, unique=True)
    title = db.Column(db.String(255), nullable = False)
    num_reviews = db.Column(db.Integer())
    star_count = db.Column(db.Integer())
    avg_star_rating = db.Column(db.Integer())
    description = db.Column(db.String(255))
    poster_path = db.Column(db.String(255))

    ranked_list = relationship("Ranked_List", back_populates="movie")
    review = relationship("Review", back_populates="movie")

    def to_dict(self):
        return {
            'id': self.id,
            'movie_id':self.movie_id,
            'title': self.title,
            'num_reviews': self.num_reviews,
            'star_count' : self.star_count,
            'avg_star_rating':self.avg_star_rating,
            'description': self.description,
            'poster_path':self.poster_path
        }