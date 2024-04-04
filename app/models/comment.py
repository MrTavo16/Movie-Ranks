from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from .db import db, environment, SCHEMA, add_prefix_for_prod

class Comment(db.Model):
    __tablename__ = 'comments'
    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer(), primary_key = True)
    user_id = db.Column(db.Integer(), db.ForeignKey(add_prefix_for_prod("users.id")))
    post_id = db.Column(db.Integer(), db.ForeignKey(add_prefix_for_prod("posts.id")))
    comment_id = db.Column(db.Integer())
    comment_text = db.Column(db.String(255), nullable=False)
    likes = db.Column(db.Integer(), default=0)
    users_liked = db.Column(db.String(255))

    user = relationship("User", back_populates='comment')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'post_id':self.post_id,
            'comment_id':self.comment_id,
            'comment_text':self.comment_text,
            'likes':self.likes,
            'users_liked' : self.users_liked
        }