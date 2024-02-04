from flask import Blueprint, jsonify, request
\
from flask_login import login_required
from app.models import Movie

movie_routes = Blueprint("movies", __name__)

@movie_routes.route('/')
def movies():
    """
    Query for all movies
    """
    url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US"

    headers = {
        "accept": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YWQ5YWYxOTZiYjBkMzc2NzMzMTg2MTU3MzU0ZWI0MSIsInN1YiI6IjY1YmIwNzI1MTFjMDY2MDE3YmNmOThlZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-lIyR_-jhyowVMgoS5B7VBxns_2An9GgMs-E1sNGP0A"
    }

    response = request.get(url, headers=headers)
    return url