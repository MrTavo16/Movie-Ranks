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
    return {"rankedList": {int(list1['id']):movie_arr}}







@ranked_list_routes.route('/', methods=['POST'])
def add_ranked_list():
    data = request.json
    user_id = data['user_id']
    movie_id = str(data['movie_id'])
    curr_ranked_lists_query = Ranked_List.query.filter(Ranked_List.user_id == user_id)
    arr = [rankL.to_dict() for rankL in curr_ranked_lists_query]
    movie_str= movie_id+','
    if not arr:
        solo_movie_query = Movie.query.filter(Movie.movie_id == data['movie_id'])
        solo_movie = solo_movie_query[0].to_dict()
        new_ranked_list = Ranked_List(user_id = user_id, name='Ranked List',movies = movie_str)
        db.session.add(new_ranked_list)
        db.session.commit()
        curr_ranked_list = new_ranked_list.to_dict()
        solo_movie['name'] = "Ranked List"
        solo_movie['ranked_list_id'] = curr_ranked_list['id']
        # return {"rankedList": curr_ranked_list}
        return {"rankedList": {int(curr_ranked_list['id']):[solo_movie,"Ranked List"]}}
    if arr:
        ranked_list_query = arr[0]
        ranked_list = Ranked_List.query.get(int(ranked_list_query["id"]))
        ranked_movies = ranked_list_query['movies']
        if not ranked_movies:
            list1 = ranked_list.to_dict()
            ranked_movies = str(data['movie_id'])+','
            ranked_list.movies = ranked_movies
            db.session.commit()
            ranked_split = ranked_movies.split(',')
            ranked_split.remove("")
            movie_arr = []
            movie_query = Movie.query.filter(Movie.movie_id == int(ranked_split[0]))
            movie_obj = movie_query[0].to_dict()
            movie_obj['ranked_list_id'] = list1['id']
            movie_obj['name'] = list1['name']
            movie_arr.append(movie_obj)
            movie_arr.append(list1['name'])
            return {"rankedList": {int(list1['id']):movie_arr}}
            # return {"rankedList": {int(list1['id']):movie_arr}}
            #problem here
        movies = ranked_movies+movie_id+","
        ranked_split = movies.split(',')
        ranked_split.remove("")
        if len(ranked_split) > 4:
            return {"message":"cant have more than 5 movies in a Ranked List"}
        ranked_list.movies = movies
        db.session.commit()
        list1 = ranked_list.to_dict()
        movie_arr = []
        for movie_id_new in ranked_split:
            movie_query = Movie.query.filter(Movie.movie_id == int(movie_id_new))
            movie_obj = movie_query[0].to_dict()
            movie_obj['ranked_list_id'] = list1['id']
            movie_obj['name'] = list1['name']
            movie_arr.append(movie_obj)
        movie_arr.append(list1['name'])
        # return ranked_list
        # return {"message":ranked_movie_num}
        return {"rankedList": {int(list1['id']):movie_arr}}
        # return ranked_list.to_dict()

    # new_ranked_list = Ranked_List(user_id = user_id, movies = movies)
    # db.session.add(new_ranked_list)
    # db.session.commit()
    # return {"arr_len":arr}






@ranked_list_routes.route('/<int:ranked_list_id>', methods=['PUT'])
def edit_ranked_list(ranked_list_id):
    data = request.json
    list_name = data['name']
    movie_arr = data['movies']
    ranked_list_query = Ranked_List.query.get(ranked_list_id)
    ranked_list_query.name = list_name
    movies_in_str = ''
    list1 = ranked_list_query.to_dict()
    if movie_arr:
        for movie in movie_arr:
            movies_in_str = movies_in_str + f'{movie}'+','
    ranked_split = movies_in_str.split(',')
    ranked_split.remove("")
    new_movie_arr = []
    for movie_id_new in ranked_split:
        obj = {}
        movie_query = Movie.query.filter(Movie.movie_id == int(movie_id_new))
        movie_obj = movie_query[0].to_dict()
        movie_obj['ranked_list_id'] = list1['id']
        movie_obj['name'] = list1['name']
        new_movie_arr.append(movie_obj)
    new_movie_arr.append(list_name)
    ranked_list_query.movies = movies_in_str
    db.session.commit()
    # return {"rankedList": movies_in_str}
    return {"rankedList":{int(list1['id']):new_movie_arr}}









@ranked_list_routes.route('/<int:ranked_list_id>', methods=['DELETE'])
def delete_ranked_list(ranked_list_id):
    ranked_list = Ranked_List.query.get(ranked_list_id)

    db.session.delete(ranked_list)
    db.session.commit()
    return ranked_list.to_dict()