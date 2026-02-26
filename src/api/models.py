from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship
from flask_bcrypt import generate_password_hash
from typing import  Optional

db = SQLAlchemy()

exercise_equipment = db.Table (
    "exercise_equipment",
    db.Model.metadata,
    db.Column("exercise_id",db.Integer,db.ForeignKey("exercise.id"),primary_key=True),
    db.Column("equipment_id",db.Integer,db.ForeignKey("equipment.id"),primary_key=True),
)

exercise_muscle = db.Table (
    "exercise_muscle",
    db.Model.metadata,
    db.Column("exercise_id",db.Integer,db.ForeignKey("exercise.id"),primary_key=True),
    db.Column("muscle_id",db.Integer,db.ForeignKey("muscle.id"),primary_key=True),
)

class Equipment(db.Model):
    __tablename__ = "equipment"
    id: Mapped[int]=mapped_column (primary_key = True)
    name: Mapped[str]=mapped_column (db.String (100), unique = True,nullable=False)

    exercises : Mapped[list["Exercise"]] = relationship (
        secondary = exercise_equipment,
        back_populates = "equipments"
    )
    def serialize (self):
        return {
            "id":self.id,
            "name": self.name
            }
    

class Muscle(db.Model):
    __tablename__ = "muscle"
    id: Mapped[int]=mapped_column (primary_key = True)
    name: Mapped[str]=mapped_column (db.String (100), unique = True, nullable=False)

    exercises : Mapped[list["Exercise"]] = relationship (
        secondary = exercise_muscle,
        back_populates = "muscles"
    )
    def serialize (self):
        return {
            "id":self.id,
            "name": self.name
            } 

class Exercise (db.Model):
    __tablename__ = "exercise"
    id:Mapped [int]= mapped_column (primary_key = True)
    name:Mapped [str]= mapped_column (db.String(120),nullable = False)
    description :Mapped [Optional [str]]= mapped_column (db.Text , nullable = True)

    equipments : Mapped [list ["Equipment"]] = relationship (
        secondary = exercise_equipment,
        back_populates = "exercises"
    )
    muscles : Mapped [list ["Muscle"]] = relationship (
        secondary = exercise_muscle,
        back_populates = "exercises"
    )
    def Serialize ( self):
        return {
            "id":self.id,
            "name":self.name,
            "description":self.description,
            "equipment": [e.name for e in self.equipment],
            "muscles": [m.name for m in self.muscles],
        }




class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(
        String(120), unique=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(nullable=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password).decode('utf-8')

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
