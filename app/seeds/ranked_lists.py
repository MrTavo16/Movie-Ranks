from app.models import db, Ranked_List, environment, SCHEMA
from sqlalchemy.sql import text


def seed_ranked_lists():
    ranked_list1 = Ranked_List(user_id=2 ,movies="693134,467244,",name="Must Watch List")
    ranked_list2 = Ranked_List(user_id=3 ,movies="787699,673593,",name="Underrated Movies")

    db.session.add(ranked_list1)
    db.session.add(ranked_list2)
    db.session.commit()

def undo_ranked_lists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.ranked_lists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM ranked_lists"))
        
    db.session.commit()