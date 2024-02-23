from flask import Blueprint, jsonify, request, abort
from sqlalchemy.orm import  session, lazyload
from flask_login import login_required
from app.models import Movie, db, Ranked_List, User

ranked_list_routes = Blueprint('ranked_lists', __name__)

@ranked_list_routes.route('/<int:user_id>')
def ranked_list_by_user_id(user_id):
    lists = Ranked_List.query.filter(Ranked_List.user_id == user_id)
    listarr = [li.to_dict() for li in lists]
    if not listarr:
        return {"rankedList":[]}

    list1 = lists[0].to_dict()
    movies = list1['movies'].split(',')
    movies.remove("")
    count = 0
    movie_arr = []
    for movie_id in movies:
        obj = {}
        movie_query = Movie.query.filter(Movie.movie_id == int(movie_id))
        movie_obj = movie_query[0].to_dict()
        movie_obj['ranked_list_id'] = list1['id']
        movie_obj['name'] = list1['name']
        movie_arr.append(movie_obj)
    movie_arr.append(list1['name'])

    # return movie[0].to_dict()
    # return list1
    # return [li.to_dict() for li in lists]
    # return {"message":2}
    return {"rankedList": movie_arr}


@ranked_list_routes.route('/', methods=['POST'])
def add_ranked_list():
    data = request.json
    user_id = data['user_id']
    movie_id = str(data['movie_id'])
    curr_ranked_lists_query = Ranked_List.query.filter(Ranked_List.user_id == user_id)
    arr = [rankL.to_dict() for rankL in curr_ranked_lists_query]
    movie_str= movie_id+','
    if not arr:
        new_ranked_list = Ranked_List(user_id = user_id, name='Ranked list',movies = movie_str)
        db.session.add(new_ranked_list)
        db.session.commit()
        return new_ranked_list.to_dict()
    if arr:
        ranked_list_query = arr[0]
        ranked_list = Ranked_List.query.get(int(ranked_list_query["id"]))
        ranked_movies = ranked_list_query['movies']
        ranked_split = ranked_movies.split(',')
        ranked_split.remove("")
        if len(ranked_split) > 4:
            return {"message":"cant have more than 5 movies in a Ranked List"}
        movies = ranked_movies+movie_id+","
        ranked_list.movies = movies
        db.session.commit()
        # return ranked_list
        # return {"message":ranked_movie_num}
        return ranked_list.to_dict()

    # new_ranked_list = Ranked_List(user_id = user_id, movies = movies)
    # db.session.add(new_ranked_list)
    # db.session.commit()
    return {"arr_len":arr}

@ranked_list_routes.route('/<int:ranked_list_id>', methods=['PUT'])
def edit_ranked_list(ranked_list_id):
    data = request.json
    ranked_list = Ranked_List.query.get(ranked_list_id)
    movie_arr = data['movies']
    movies_in_str = ''
    if movie_arr:
        for movie in movie_arr:
            movies_in_str = movies_in_str + f'{movie}'+','

    return {"movies":movies_in_str}
    # return ranked_list.to_dict()

@ranked_list_routes.route('/<int:ranked_list_id>', methods=['DELETE'])
def delete_ranked_list(ranked_list_id):
    ranked_list = Ranked_List.query.get(ranked_list_id)

    db.session.delete(ranked_list)
    db.session.commit()
    return ranked_list.to_dict()