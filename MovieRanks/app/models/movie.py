from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from .db import db, environment, SCHEMA, add_prefix_for_prod

class Movie(db.Model):
    __tablename__ = "movies"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer(), primary_key = True)
    title = db.Column(db.String(255), nullable = False)
    description = db.Column(db.String(255))
    img_id = db.Column(db.Integer())

    ranked_list = relationship("Ranked_List", back_populates="movie")
    review = relationship("Review", back_populates="movie")

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'img_url':self.img_url
        }