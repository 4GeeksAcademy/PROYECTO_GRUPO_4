
from api.models import db,Equipment,Exercise,Muscle,Workout,WorkoutExercise


def generate_workout (user_id,muscle_id,equipment_ids,max_time):
    
    query = Exercise.query.filter(Exercise.muscles.any(id=muscle_id))
    
    if equipment_ids:
        query = query.filter(Exercise.equipments.any(Equipment.id.in_(equipment_ids)))
    
    posibles_exercises = query.all()

    if not posibles_exercises:
            return None
        
