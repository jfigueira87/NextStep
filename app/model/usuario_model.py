from sqlalchemy import Column, String, Integer
from app.config.db import Base

# usuario table model
class UsuarioModel(Base): 
    __tablename__ = "usuario"
    id =Column(Integer, primary_key=True, autoincrement=True)
    nombre =Column(String(100))
    apellido = Column(String(100))
    edad = Column(Integer(50))
    cc_aa = Column(String(20))
    provincia = Column(String(100))
    email = Column(String(100))
    centro_estudios = Column(String(100))

   
