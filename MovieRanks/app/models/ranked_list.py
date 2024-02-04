from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from .db import db, environment, SCHEMA, add_prefix_for_prod

class Ranked_List(db.Model):
    __tablename__ = 'ranked_lists'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer(), primary_key = True)
    user_id = db.Column(db.Integer())
    movie_id = db.Column(db.Integer())
    
    user = relationship("User", back_populates="ranked_list")
    movie = relationship("Movie", back_populates="ranked_list")