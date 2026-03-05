import random
from api.models import db, Equipment, Exercise, Muscle, Workout, WorkoutExercise


def generate_workout(user_id, muscle_id, equipment_ids, max_time, workout_name):

    query = Exercise.query.filter(Exercise.muscles.any(id=muscle_id))

    if equipment_ids:
        query = query.filter(Exercise.equipments.any(
            Equipment.id.in_(equipment_ids)))

    posibles_exercises = query.all()

    if not posibles_exercises:
        return None

    cantidad_ejercicios = max(1, max_time // 10)

    if len(posibles_exercises) > cantidad_ejercicios:
        seleccionados = random.sample(
            posibles_exercises, k=cantidad_ejercicios)
    else:
        seleccionados = posibles_exercises

    es_crossfit = False
    for ex in seleccionados:
        for eq in ex.equipments:
            if eq.id == 1:
                es_crossfit = True
                break

    if es_crossfit:
        tipo_rutina = "Crossfit"
    else:
        tipo_rutina = "Hyrox"

    nuevo_entrenamiento = Workout(
        user_id=user_id,
        name=workout_name,
        type=tipo_rutina,
        time=max_time
    )
    for i, ex in enumerate(seleccionados):
        detalle = WorkoutExercise(
            exercise_id=ex.id,
            order=i + 1,
            reps=12,
            percent_of_max=75
        )
        nuevo_entrenamiento.workout_exercises.append(detalle)

    return nuevo_entrenamiento
