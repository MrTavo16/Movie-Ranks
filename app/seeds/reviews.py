from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reviews():
    review1 = Review(user_id=2 ,review ='The movie was awesome!!!',username='marnie' ,movie_id = 2,stars = 1)
    review2 = Review(user_id=3 ,review ='The movie was pretty mid ngl',username='bobbie' ,movie_id = 2,stars= 1)

    db.session.add(review1)
    db.session.add(review2)
    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))
        
    db.session.commit()