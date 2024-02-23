from flask import Blueprint, jsonify, request, abort

from flask_login import login_required
from app.models import Movie, db, Review, User

movie_routes = Blueprint("movies", __name__)


@movie_routes.route('/', methods=['POST'])
def movie_check():
    data = request.json
    movies = data['results']
    db_movies = Movie.query.all()
    if not db_movies:
        for movie in movies:
            movie_id = movie['id']
            title = movie['title']
            description = movie['overview']
            poster_path = movie['poster_path']
            new_movie = Movie(movie_id = movie_id, title = title, description = description, poster_path = poster_path)
            db.session.add(new_movie)
            db.session.commit()
        db_movies = Movie.query.all()
        return db_movies
    # movie = Movie.query.filter(Movie.movie_id == id)
    # if not movie:
    return movies

@movie_routes.route('/<int:id>')
def movie_by_id(id):
    movie = Movie.query.filter(Movie.movie_id == int(id))
    if not movie:
        return {"message":"empty"}
    return movie[0].to_dict()
    # return [mov.to_dict() for mov in movie]

@movie_routes.route('/<int:movie_id>/reviews')
def get_movie_reviews_by_id(movie_id):
    reviews = Review.query.filter(Review.movie_id == movie_id)
    return{"reviews":[review.to_dict() for review in reviews]}

@movie_routes.route('/<int:movie_id>/reviews', methods=['POST'])
def add_movie_review(movie_id):
    data = request.json
    users= User.query.get(data['user_id'])
    user = users.to_dict()
    # hit = False
    # if not data['review'] or data['stars'] > 6 or data['stars']<=0:
    #     return{'message':'reviews cant be empty and stars have to be between 1 and 5'}
    # movie_in_arr = Movie.query.filter(Movie.movie_id == int(movie_id))
    # movie = movie_in_arr[0].to_dict()
    # if data['stars'] and data['review']:
    #     if not movie['num_reviews'] and not movie['star_count']:
    #         hit = True
            # movie['num_reviews'] = 1
            # movie['star_count'] = data['stars']
            # movie['avg_star_rating'] = data['stars']
        # else:
        #     hit = True
            # movie['num_reviews'] += 1
            # movie['star_count'] += data['stars']
            # movie['avg_star_rating'] = movie['star_count'] / movie['num_reviews'] 

    user_id = data['user_id']
    username = user['username']
    movie_id = movie_id
    review = data['review']
    stars = data['stars']
    new_review = Review(user_id = user_id, movie_id = movie_id, username = username, review = review, stars = stars)
    db.session.add(new_review)
    db.session.commit()
    # return {"hit":f"{username}"}
    return new_review.to_dict()
