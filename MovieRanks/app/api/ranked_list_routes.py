from flask import Blueprint, jsonify, request, abort
from sqlalchemy.orm import  session
from flask_login import login_required
from app.models import Movie, db, Ranked_List

ranked_list_routes = Blueprint('ranked_lists', __name__)

@ranked_list_routes.route('/<int:user_id>')
def ranked_list_by_user_id(user_id):
    # curr_ranked_lists = session.query(Ranked_List).join(Movie).filter(Ranked_List.user_id)
    # curr_ranked_lists = Ranked_List.query.filter(Ranked_List.user_id == user_id).options(joinedload(Ranked_List.movie)).all()
    curr_ranked_lists = session.query(Ranked_List).filter(Ranked_List.movie.user_id == user_id).all()
    # curr_movie = curr_ranked_lists.movie

    return [rankL.to_dict() for rankL in curr_ranked_lists.movie] 

@ranked_list_routes.route('/', methods=['POST'])
def add_ranked_list():
    data = request.json
    user_id = data['user_id']
    movie_id = data['movie_id']

    curr_ranked_lists = Ranked_List.query.filter(Ranked_List.user_id == user_id)
    arr = [rankL.to_dict() for rankL in curr_ranked_lists]
    if len(arr) == 5:
        return {"message":"cant have more than 5 "}
    new_ranked_list = Ranked_List(user_id = user_id, movie_id = movie_id)
    db.session.add(new_ranked_list)
    db.session.commit()

    return new_ranked_list.to_dict()