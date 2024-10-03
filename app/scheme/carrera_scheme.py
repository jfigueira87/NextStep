from typing import Optional
from pydantic import BaseModel


class Carrera(BaseModel):

    id : Optional[int]
    titulacion: str
    tipo_estudio: str
    


     