from app.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text

def seed_posts():
    post1 = Post(user_id = 2, username='marnie', post_text = 'there are some great movies out!', likes=0)
    post2 = Post(user_id = 3, username='bobbie', post_text = 'there are some great movies out right now!', likes=0)

    db.session.add(post1)
    db.session.add(post2)
    db.session.commit()

def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))
        
    db.session.commit()