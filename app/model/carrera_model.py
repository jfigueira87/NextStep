from sqlalchemy import Column, String, Integer
from app.config.db import Base

#carrera table model
class CarreraModel(Base):
   __tablename__ = "carrera"
   id = Column(Integer, primary_key=True, autoincrement=True)
   titulacion =Column(String(100))
   tipo_estudio =Column(String(100))