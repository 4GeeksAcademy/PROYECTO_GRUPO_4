import random
from api.models import db, Equipment, Exercise, Muscle, Workout, WorkoutExercise


def generate_workout(user_id, muscle_id, equipment_ids, max_time, workout_name):
    

    query = Exercise.query.filter(Exercise.muscles.any(id=muscle_id))

    if equipment_ids:
        query = query.filter((Exercise.equipments.any(
            Equipment.id.in_(equipment_ids)))|
            (db.not_(Exercise.equipments.any())))
 #   else:
  #      query= query.filter(db.not_(Exercise.equipments.any()))

    posibles_exercises = query.all()
    print(f"Ejercicios encontrados para muscle_id {muscle_id}: {len(posibles_exercises)}")
    if not posibles_exercises:
        return None
    
    complementos = []
    if max_time > 30:
        query_comp = Exercise.query.filter(Exercise.muscles.any(Muscle.name.in_(['Cardio', 'Abs', 'Abdominales'])))
        if equipment_ids:
            query_comp = query_comp.filter((Exercise.equipments.any(Equipment.id.in_(equipment_ids))) | (db.not_(Exercise.equipments.any())))
        complementos = query_comp.all()

    cantidad_ejercicios = max(1, max_time // 8)


    seleccionados = []
    
    num_principales = cantidad_ejercicios // 2 if max_time > 30 else cantidad_ejercicios
    
    if len(posibles_exercises) > num_principales:
        seleccionados = random.sample(posibles_exercises, k=num_principales)
    else:
        seleccionados = posibles_exercises[:]



    if len(seleccionados) < cantidad_ejercicios and complementos:
        extras = [e for e in complementos if e not in seleccionados]
        faltan = cantidad_ejercicios - len(seleccionados)
        seleccionados.extend(random.sample(extras, k=min(len(extras), faltan)))

        

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

    db.session.add(nuevo_entrenamiento)

    for i, ex in enumerate(seleccionados):
        reps_option=[21,15,9,12,10,50]
        detalle = WorkoutExercise(
            exercise_id=ex.id,
            order=i + 1,
            reps=random.choice(reps_option),
            percent_of_max=75
        )
        nuevo_entrenamiento.workout_exercises.append(detalle)

    db.session.commit()

    return nuevo_entrenamiento
