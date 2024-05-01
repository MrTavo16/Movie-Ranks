from flask import Blueprint, jsonify, request, abort

from flask_login import login_required
from app.models import Post, Comment, db, User

post_routes = Blueprint("posts", __name__)


@post_routes.route('/')
def post_check():
    db_posts = Post.query.all()
    arr = []
    for post in db_posts:
        arr.append(post.to_dict())
    
    return {'posts': arr}


@post_routes.route('/<int:id>')
def post_info(id):
    db_posts = Post.query.get(id)
    db_comments = Comment.query.filter(Comment.post_id == id)

    obj = {}
    obj['post'] = db_posts.to_dict()
    


    return obj

@post_routes.route('/', methods=['POST'])
def create_post():
    data = request.json
    users= User.query.get(int(data['user_id']))
    user = users.to_dict()

    user_id = data['user_id']
    username = user['username']
    post_text = data['post_text']
    likes = 0

    post = Post(user_id=user_id, username=username, post_text=post_text,likes=likes)

    db.session.add(post)
    db.session.commit()
    return post.to_dict()


@post_routes.route('/<int:id>/likes', methods=['PUT'])
def like_edit(id):
    data = request.json
    user_id_like = data['user_id_like']
    user_check = User.query.get(user_id_like)
    if not user_check:
        return {"message":"unauthorized"}, 401
    post_q = Post.query.get(id)
    if not post_q:
        return {"message":"post not found"}, 404
    post = post_q.to_dict()
    ids = post['users_liked']
    id_arr = []
    u_l = ''
    if post['users_liked']:
        if f'{user_id_like},' in post['users_liked']:
            users_liked_split = post['users_liked'].split(',')
            users_liked_split.remove('')
            users_liked_split.remove(f'{user_id_like}')
            post_likes = len(users_liked_split)
            for id in users_liked_split:
                u_l += id + ','
            post_q.likes = post_likes
            post_q.users_liked = u_l
            upd_post = post_q.to_dict()
            db.session.add(post_q)
            db.session.commit()
            return upd_post
        else:
            u_l += post['users_liked'] + f'{user_id_like}'+','
            post_q.users_liked = u_l
            users_liked_split = u_l.split(',')
            users_liked_split.remove('')
            post_likes = len(users_liked_split)
            post_q.likes = post_likes
            upd_post = post_q.to_dict()
            db.session.add(post_q)
            db.session.commit()
            return upd_post

    if not post['users_liked']:
        u_l += f'{user_id_like}'+','
    post_q.users_liked = u_l
    post_q.likes = 1
    post_two = post_q.to_dict()
    db.session.add(post_q)
    db.session.commit()

    return post_two
        

@post_routes.route('/<int:id>', methods=['PUT'])
def edit_post(id):
    data = request.json
    post = Post.query.get(id)
    post_text = data['post_text']
    post.post_text = post_text
    db.session.commit()

    return post.to_dict()

@post_routes.route('/<int:id>', methods=['DELETE'])
def delete_post(id):
    post = Post.query.get(id)
    db.session.delete(post)
    db.session.commit()
    return post.to_dict()