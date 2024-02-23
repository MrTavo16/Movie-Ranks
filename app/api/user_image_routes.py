from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Image, db

image_routes = Blueprint('user_images', __name__)

@image_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def user_img_delete(id):
    user_img = Image.query.get(id)
    db.session.delete(user_img)
    db.session.commit()
    return user_img.to_dict()