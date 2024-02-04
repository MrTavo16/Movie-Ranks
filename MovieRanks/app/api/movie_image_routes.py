from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Image, db

image_routes = Blueprint('movie_images', __name__)

@image_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def movie_img_delete(id):
    movie_img = Image.query.get(id)
    db.session.delete(movie_img)
    db.session.commit()
    return movie_img.to_dict()