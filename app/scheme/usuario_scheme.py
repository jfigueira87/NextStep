from typing import Optional
from pydantic import BaseModel

class Usuario(BaseModel):
    
    id: Optional[int]
    nombre: str
    apellido: str
    edad: int
    cc_aa: str
    provincia: str
    email: str
    centro_estudios: str
   