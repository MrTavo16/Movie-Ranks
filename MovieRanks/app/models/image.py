from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from .db import db, environment, SCHEMA, add_prefix_for_prod


class Image(db.Model):
    __tablename__ = 'images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    imageable_id = db.Column(db.Integer, nullable = False)
    imageable_type = db.Column(db.String(255), nullable = False)
    url = db.Column(db.String(255), nullable = False)

    def to_dict(self):
        return {
            'id': self.id,
            'imageable_id': self.imageable_id,
            'imageable_type': self.imageable_type,
            'url':self.url
        }