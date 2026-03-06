"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Exercise, Muscle, Equipment, Workout, FavoriteWorkout, WorkoutExercise
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
import requests
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
def signup():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password required"}), 400

    existing_user = db.session.execute(db.select(User).where(
        User.email == email)).scalar_one_or_none()

    if existing_user:
        return jsonify({"error": "Email already exist"}), 400

    new_user = User(email=email)
    new_user.set_password(password)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"Message": "User created usccessfully"}), 201


@api.route('/login', methods=['POST'])
def login():

    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    user = db.session.execute(db.select(User).where(
        User.email == email)).scalar_one_or_none()

    if user is None:
        return jsonify({"error": "Invalided email or password"}), 401

    if user.check_password(password):
        access_token = create_access_token(identity=str(user.id))
        return jsonify({"Message": "Login successful", "token": access_token, "user": user.serialize()}), 200

    else:
        return jsonify({"error": "Invalided email or password"}), 401


@api.route('/profile', methods=['GET'])
@jwt_required()
def profile():

    user_id = get_jwt_identity()

    user = db.session.execute(
        db.select(User).where(User.id == int(user_id))
    ).scalar_one_or_none()

    if user is None:
        return jsonify({"error": "User not found"}), 404

    return jsonify({
        "message": "Profile data",
        "user": user.serialize()
    }), 200


@api.route('/favorites/<int:workout_id>', methods=['POST'])
@jwt_required()
def add_favorite(workout_id):

    user_id = get_jwt_identity()

    workout = db.session.get(Workout, workout_id)

    if workout is None:
        return jsonify({"error": "Workout not found"}), 404

    existing_favorite = db.session.execute(
        db.select(FavoriteWorkout).where(
            FavoriteWorkout.user_id == int(user_id),
            FavoriteWorkout.workout_id == workout_id
        )
    ).scalar_one_or_none()

    if existing_favorite:
        return jsonify({"error": "Workout already in favorites"}), 400

    favorite = FavoriteWorkout(
        user_id=int(user_id),
        workout_id=workout_id
    )

    db.session.add(favorite)
    db.session.commit()

    return jsonify({
        "message": "Workout added to favorites"
    }), 201


@api.route('/favorites', methods=['GET'])
@jwt_required()
def get_favorites():

    user_id = get_jwt_identity()

    favorites = db.session.execute(
        db.select(FavoriteWorkout).where(
            FavoriteWorkout.user_id == int(user_id)
        )
    ).scalars().all()

    results = []

    for fav in favorites:
        results.append({
            "favorite_id": fav.id,
            "workout": fav.workout.serialize()
        })

    return jsonify(results), 200


@api.route('/favorites/<int:workout_id>', methods=['DELETE'])
@jwt_required()
def remove_favorite(workout_id):

    user_id = get_jwt_identity()

    favorite = db.session.execute(
        db.select(FavoriteWorkout).where(
            FavoriteWorkout.user_id == int(user_id),
            FavoriteWorkout.workout_id == workout_id
        )
    ).scalar_one_or_none()

    if favorite is None:
        return jsonify({"error": "Favorite not found"}), 404

    db.session.delete(favorite)
    db.session.commit()

    return jsonify({
        "message": "Workout removed from favorites"
    }), 200


@api.route('/import-wger', methods=['GET'])
def import_wger():

    url = "https://wger.de/api/v2/exerciseinfo/?language=2&status=2"
    response = requests.get(url)

    if response.status_code != 200:
        return jsonify({"msg": "No pude conectar con la Api"}), 500

    data = response.json()
    print(data)
    ejercicios_lista = data.get('results', [])
    print(f"He recibido {len(ejercicios_lista)} ejercicios de la API")
    for item in ejercicios_lista:
        translations = item.get('translations')

        if translations is None or translations == "":
            continue

        for translation in translations:
            if translation["language"] == 4:
                nuevo_ejercicio = Exercise(
                    name=translation["name"],
                    description=translation["description"]

                )
                db.session.add(nuevo_ejercicio)

    db.session.commit()
    return jsonify({"msg": "Se han guardado los ejercicios nuevos"}), 200


@api.route('/import-equipment', methods=['GET'])
def import_equipment():
    url = "https://wger.de/api/v2/equipment/"
    response = requests.get(url)

    if response.status_code != 200:
        return jsonify({"ms": "No puede conectar con la Api externa"}), 200

    data = response.json()
    print(data)
    equipamiento_lista = data.get('results', [])
    print(f"He recibido {len(equipamiento_lista)} equipamientos de la API")

    for item in equipamiento_lista:
        nombre_equipamiento = item.get('name')

        if nombre_equipamiento is None or nombre_equipamiento == "":
            continue

        nuevo_equipo = Equipment(
            name=nombre_equipamiento
        )
        db.session.add(nuevo_equipo)

    db.session.commit()
    return jsonify({"msg": "Se han guardado los ejercicios nuevos"}), 200


@api.route('/import-muscles', methods=['GET'])
def import_muscles():
    url = "https://wger.de/api/v2/muscle/"
    response = requests.get(url)

    if response.status_code != 200:
        return jsonify({"ms": "No puede conectar con la Api externa"}), 200

    data = response.json()
    print(data)
    musculos_lista = data.get('results', [])
    print(f"He recibido {len(musculos_lista)} musculos de la API")

    for item in musculos_lista:
        nombre_musculo = item.get('name_en')

        if nombre_musculo is None or nombre_musculo == "":
            continue

        nuevo_musculo = Muscle(
            name=nombre_musculo
        )
        db.session.add(nuevo_musculo)

    db.session.commit()
    return jsonify({"msg": "Se han guardado los ejercicios nuevos"}), 200

# Eliminar esto:
