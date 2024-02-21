from flask import Blueprint, jsonify, request, abort
from sqlalchemy.orm import  session, lazyload
from flask_login import login_required
from app.models import Movie, db, Ranked_List, User

ranked_list_routes = Blueprint('ranked_lists', __name__)

@ranked_list_routes.route('/<int:user_id>')
def ranked_list_by_user_id(user_id):
    # curr_ranked_lists = session.query(Ranked_List).join(Movie).filter(Ranked_List.user_id)
    # curr_ranked_lists = Ranked_List.query.filter(Ranked_List.user_id == user_id).options(joinedload(Ranked_List.movie)).all()
    # curr_ranked_lists = session.query(Ranked_List).filter(Ranked_List.movie.user_id == user_id).all()
    # lists = Ranked_List.query.options(db.lazyload('movie')).all()
    userarr = User.query.get(user_id)
    user = userarr.to_dict()
    lists = Ranked_List.query.filter(Ranked_List.user_id == user_id)
    count = 0
    movie_arr = []
    for listeded in lists:
        obj = {}
        listed = listeded.to_dict()
        movies = Movie.query.filter(Movie.movie_id == listed['movie_id'])
        movie = movies[0].to_dict()
        obj['movie_id'] = movie['movie_id']
        obj['id'] = movie['id']
        obj['title'] = movie['title']
        obj['poster_path'] = movie['poster_path']
        obj['avg_star_rating'] = movie['avg_star_rating']
        obj['username'] = user['username']
        obj['bio'] = user['bio']
        obj['user_id'] = user['id']
        movie_arr.append(obj)
        count += 1

    if not len(movie_arr):
        return {"rankedList":[user]}

    # return movie[0].to_dict()
    # return lists[0].to_dict()
    # return [li.to_dict() for li in lists]
    return {"rankedList":movie_arr}
    # return {"message":2}

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