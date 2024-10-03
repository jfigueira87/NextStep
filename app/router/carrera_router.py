from fastapi import APIRouter, Depends
from app.scheme.carrera_scheme import Carrera
from app.service.carrera_service import CarreraService
from sqlalchemy.ext.asyncio import AsyncSession
from app.config.db import get_async_session
from typing import List, Dict

# RUTAS
router = APIRouter(tags=["carrera"])
carrera_serv = CarreraService()


# COSULTAR TODAS LAS carrera
@router.get("/carreras/")
async def consult_carreras(db: AsyncSession = Depends(get_async_session)):
    return await carrera_serv.consult_carreras(db)


# consult insccription dy id
@router.get("/carrera/{id}")
async def consult_carrera_by_id(id:int, db: AsyncSession = Depends(get_async_session)):
    return await carrera_serv.consult_carrera_id(id, db)


# consult carrera PAGADAS POR ID ALUMNO
@router.get("/paid_carrera/{id}")
async def consult_paid_carrera( id:int, bolean: bool, db: AsyncSession = Depends(get_async_session)):
    return await carrera_serv.consult_paid_carrera(id, bolean, db)


# CREAR UNA NUEVA INSCRIPCIÓN
@router.post("/carrera")
async def create_carrera(data:Carrera, db: AsyncSession = Depends(get_async_session)):
    return await carrera_serv.create_new_carrera(data, db)


# EDITAR UNA INSCRIPCIÓN
@router.put("/carrera/{id}")
async def edit_carrera(id: int, data:Carrera, db: AsyncSession = Depends(get_async_session)):
    return await carrera_serv.edit_carrera(id, data, db)


# ELIMINAR carrera
@router.delete("/carrera/{id}")
async def delete_carrera(id: int, db: AsyncSession = Depends(get_async_session)):
   return await carrera_serv.delete_carrera(id, db)


@router.get("/carreras_by_month", response_model=Dict[str, List[Carrera]])
async def get_inscripions_month(db: AsyncSession = Depends(get_async_session)):
   return await carrera_serv.carreras_by_month(db) 