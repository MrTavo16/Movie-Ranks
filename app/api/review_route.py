from flask import Blueprint, jsonify, request, abort

from flask_login import login_required
from app.models import Movie, db, Review


review_routes = Blueprint("reviews", __name__)

@review_routes.route('/<int:review_id>', methods=["PUT"])
def edit_route(review_id):
    data = request.json
    review_in_db = Review.query.get(review_id)
    review = data['review']
    stars = data['stars']
    review_in_db.review = review
    review_in_db.stars = stars
    db.session.commit()

    return review_in_db.to_dict()

@review_routes.route('/<int:review_id>', methods=["DELETE"])
def delete_review(review_id):
    review = Review.query.get(review_id)

    db.session.delete(review)
    db.session.commit()
    return review.to_dict()