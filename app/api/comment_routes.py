from flask import Blueprint, jsonify, request, abort

from flask_login import login_required
from app.models import Comment, db, User

comment_routes = Blueprint("comments", __name__)

@comment_routes.route('/')
def comment_check():
    return 