from flask import Blueprint, jsonify, request, abort

from flask_login import login_required
from app.models import Comment, db, User

comment_routes = Blueprint("comments", __name__)

@comment_routes.route('/<int:id>')
def comment_check(id):
    db_comments = Comment.query.filter(Comment.post_id == id)

    obj = {}

    for comments in db_comments:
        comment = comments.to_dict()
        if not comment['comment_id']:
            obj[f'{comment["id"]}'] = [comment, []]
        else: obj[f'{comment["comment_id"]}'][1].append(comment)

    return obj