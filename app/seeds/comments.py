from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text

def seed_comments():
    comment1 = Comment(user_id=3 ,post_id =1, username='bobbie' ,comment_text = 'right! cant wait to see them')
    comment2 = Comment(user_id=2 ,post_id =2, username='marnie' ,comment_text = 'definitly!')
    comment3 = Comment(user_id=2 ,post_id =2, username='marnie' ,comment_text = 'definitly!')
    comment4 = Comment(user_id=2 ,post_id =1, username='marnie' ,comment_id =1 ,comment_text = 'definitly!')

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))
        
    db.session.commit()