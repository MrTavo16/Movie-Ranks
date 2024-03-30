from flask import Blueprint, jsonify, request, abort

from flask_login import login_required
from app.models import Post, db, User

post_routes = Blueprint("posts", __name__)


@post_routes.route('/')
def post_check():
    db_posts = Post.query.all()
    arr = []
    for pos in db_posts:
        post = pos.to_dict()
        arr.append(post)
        
    return arr