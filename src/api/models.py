from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Integer, ForeignKey, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from flask_bcrypt import generate_password_hash, check_password_hash
from typing import Optional

db = SQLAlchemy()

exercise_equipment = db.Table(
    "exercise_equipment",
    db.Model.metadata,
    db.Column("exercise_id", db.Integer, db.ForeignKey(
        "exercise.id"), primary_key=True),
    db.Column("equipment_id", db.Integer, db.ForeignKey(
        "equipment.id"), primary_key=True),
)

exercise_muscle = db.Table(
    "exercise_muscle",
    db.Model.metadata,
    db.Column("exercise_id", db.Integer, db.ForeignKey(
        "exercise.id"), primary_key=True),
    db.Column("muscle_id", db.Integer, db.ForeignKey(
        "muscle.id"), primary_key=True),
)


class Equipment(db.Model):
    __tablename__ = "equipment"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(
        db.String(100), unique=True, nullable=False)

    exercises: Mapped[list["Exercise"]] = relationship(
        secondary=exercise_equipment,
        back_populates="equipments"
    )

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name
        }

class Muscle(db.Model):
        __tablename__ = "muscle"
        id: Mapped[int] = mapped_column(primary_key=True)
        name: Mapped[str] = mapped_column(
            db.String(100), unique=True, nullable=False)

        exercises: Mapped[list["Exercise"]] = relationship(
            secondary=exercise_muscle,
            back_populates="muscles"
        )

        def serialize(self):
            return {
                "id": self.id,
                "name": self.name
            }

class Exercise (db.Model):
        __tablename__ = "exercise"
        id: Mapped[int] = mapped_column(primary_key=True)
        name: Mapped[str] = mapped_column(
            db.String(120), nullable=False)
        description: Mapped[Optional[str]] = mapped_column(
            db.Text, nullable=True)

        equipments: Mapped[list["Equipment"]] = relationship(
            secondary=exercise_equipment,
            back_populates="exercises"
        )
        muscles: Mapped[list["Muscle"]] = relationship(
            secondary=exercise_muscle,
            back_populates="exercises"
        )

        def serialize(self):
            return {
                "id": self.id,
                "name": self.name,
                "description": self.description,
                "equipment": [e.name for e in self.equipments],
                "muscles": [m.name for m in self.muscles],
            }

class Workout (db.Model):
        __tablename__ = "workout"
        id: Mapped[int] = mapped_column(primary_key=True)
        user_id: Mapped[int] = mapped_column(
            db.ForeignKey("user.id"), nullable=False)
        name: Mapped[str] = mapped_column(
            db.String(120), nullable=False)
        type: Mapped[str] = mapped_column(
            db.String(120), nullable=False)
        time: Mapped[int] = mapped_column(
            db.Integer, nullable=True)

        user: Mapped["User"] = relationship(
            back_populates="workouts"
        )
        workout_exercises: Mapped[list["WorkoutExercise"]] = relationship(
            back_populates="workout")

        def serialize(self):
            return {
                "id": self.id,
                "name": self.name,
                "type": self.type,
                "time": self.time,
                "user_id": self.user_id,
                "exercises": [we.serialize()for we in self.workout_exercises]

            }

class WorkoutExercise(db.Model):
        __tablename__ = "workout_exercises"

        id: Mapped[int] = mapped_column(
            primary_key=True)
        workout_id: Mapped[int] = mapped_column(
            db.ForeignKey("workout.id"), nullable=False)
        exercise_id: Mapped[int] = mapped_column(
            db.ForeignKey("exercise.id"), nullable=False)
        order: Mapped[int] = mapped_column(
            db.Integer, nullable=False)
        reps: Mapped[int] = mapped_column(
            db.Integer, nullable=False)
        percent_of_max: Mapped[Optional[int]] = mapped_column(
            db.Integer, nullable=False)

        workout: Mapped["Workout"] = relationship(
            back_populates="workout_exercises"
        )
        # esta relacion no tiene backpopulates porque es unidireccional, pocas veces va s preguntar a un ejercicio en cuantos entrenamientos aparece.
        exercise: Mapped["Exercise"] = relationship(
        )

class FavoriteWorkout(db.Model):
    __tablename__ = "favorite_workout"

    id: Mapped[int] = mapped_column(primary_key=True)

    user_id: Mapped[int] = mapped_column(
        ForeignKey("user.id"), nullable=False
    )

    workout_id: Mapped[int] = mapped_column(
        ForeignKey("workout.id"), nullable=False
    )

    user: Mapped["User"] = relationship("User")
    workout: Mapped["Workout"] = relationship("Workout")

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "workout_id": self.workout_id
        }

    def serialize(self):
            return {
                "id": self.id,
                "workout_id": self.workout_id,
                "exercise_id": self.exercise_id,
                "exercise_name": self.exercise.name if self.exercise else None,
                "order": self.order,
                "reps": self.reps,
                "percent_of_max": self.percent_of_max


            }

class User(db.Model):
        id: Mapped[int] = mapped_column(
            primary_key=True)
        email: Mapped[str] = mapped_column(
            String(120), unique=True, nullable=False)
        password_hash: Mapped[str] = mapped_column(
            nullable=False)

        workouts: Mapped[list["Workout"]] = relationship(
            back_populates="user")

        def set_password(self, password):
            self.password_hash = generate_password_hash(
                password).decode('utf-8')

        def check_password(self, password):
                return check_password_hash(self.password_hash, password)

        def serialize(self):
                return {
                    "id": self.id,
                    "email": self.email,
                    # do not serialize the password, its a security breach
                }
