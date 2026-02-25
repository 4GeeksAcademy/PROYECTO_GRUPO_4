"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/singup', methods=['POST'])
def singup():
    data = request.get_json()
    email = data.get ('email')
    password = data.get ('password')

    if not email or not password:
        return jsonify({"Error":"Email and password required"}), 400
    
    existing_user = db.session.execute(db.select(User).where(
        User.email == email)).scalar_one_or_none()
    
    if existing_user:
        return jsonify({"Error":"Email already exist"}), 400
    
    new_user = User(email=email)
    new_user.set_password(password)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"Message":"User created usccessfully"}), 201

    
