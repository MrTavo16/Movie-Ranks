from flask import Blueprint, jsonify, request, abort

from flask_login import login_required
from app.models import Comment, db, User

comment_routes = Blueprint("comments", __name__)

@comment_routes.route('/<int:post_id>')
def comment_check(post_id):
    db_comments = Comment.query.filter(Comment.post_id == post_id)

    obj = {}
    obj['comments'] = []

    for comments in db_comments:
        comment = comments.to_dict()
        obj['comments'].append(comment)
    return obj

@comment_routes.route('/', methods={'POST'})
def create_comment():
    data = request.json
    users= User.query.get(int(data['user_id']))
    user = users.to_dict()

    comment_id = data['comment_id']
    user_id = data['user_id']
    username = user['username']
    post_id = data['post_id']
    comment_text = data['comment_text']
    likes = 0

    comment = Comment(user_id=user_id, username=username, post_id=post_id, comment_id=comment_id, comment_text=comment_text,likes=likes)

    db.session.add(comment)
    db.session.commit()
    return comment.to_dict()

@comment_routes.route('/<int:comment_id>/likes', methods={'PUT'})
def comment_like(comment_id):
    data = request.json
    user_id_like =  data['user_id_like']
    user_check = User.query.get(user_id_like)
    if not user_check:
        return {"message":"unauthorized"}, 401
    comment_q = Comment.query.get(comment_id)
    if not comment_q:
        return {"message":"comment not found"}, 404
    comment = comment_q.to_dict()
    ids = comment['users_liked']
    id_arr = []
    u_l = ''
    if comment['users_liked']:
        if f'{user_id_like},' in comment['users_liked']:
            users_liked_split = comment['users_liked'].split(',')
            users_liked_split.remove('')
            users_liked_split.remove(f'{user_id_like}')
            comment_likes = len(users_liked_split)
            for id in users_liked_split:
                u_l += id + ','
            comment_q.likes = comment_likes
            comment_q.users_liked = u_l
            upd_comment = comment_q.to_dict()
            db.session.add(comment_q)
            db.session.commit()
            return upd_comment
        else:
            u_l += comment['users_liked'] + f'{user_id_like}'+','
            comment_q.users_liked = u_l
            users_liked_split = u_l.split(',')
            users_liked_split.remove('')
            comment_likes = len(users_liked_split)
            comment_q.likes = comment_likes
            upd_comment = comment_q.to_dict()
            db.session.add(comment_q)
            db.session.commit()
            return upd_comment
        
    if not comment['users_liked']:
        u_l += f'{user_id_like}'+','
    comment_q.users_liked = u_l
    comment_q.likes = 1
    comment_two = comment_q.to_dict()
    db.session.add(comment_q)
    db.session.commit()
    return comment_two

@comment_routes.route('/<int:comment_id>', methods={'PUT'})
def comment_update(comment_id):
    data = request.json
    comment = Comment.query.get(comment_id)
    comment_text = data['comment_text']
    comment.comment_text = comment_text
    db.session.commit()
    return comment.to_dict()

@comment_routes.route('/<int:comment_id>', methods=['DELETE'])
def comment_delete(comment_id):
    comment = Comment.query.get(int(comment_id))
    db.session.delete(comment)
    db.session.commit()
    return comment.to_dict()