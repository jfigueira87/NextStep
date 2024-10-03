from fastapi import APIRouter, Depends  # Import APIRouter and Depends from FastAPI for routing and dependency injection
from app.scheme.usuario_scheme import Usuario  # Import the Usuario schema
from app.service.usuario_service import UsuarioService  # Import the UsuarioService class
from sqlalchemy.ext.asyncio import AsyncSession  # Import AsyncSession for asynchronous database operations
from config.db import get_async_session  # Import the function to get an async session

# Create an APIRouter instance with a prefix and tags for routes related to users
router = APIRouter(prefix="/usuario", tags=["usuarios"])
# Instantiate the UsuarioService usuario
usuario_service = UsuarioService()

# Consult all usuarios
@router.get('/')
# Define an async function to consult all usuarios, with dependency injection for the database session
async def consult_usuarios(db: AsyncSession = Depends(get_async_session)):
    return await usuario_service.consult_usuarios(db)  # Call the consult_usuarios method from usuario_service

# Consult a usuario by id
@router.get('/{id}')  # 'id' is the path parameter when the user accesses this URL
# Define an async function to consult a usuario by id, with dependency injection for the database session
async def consult_usuario_id(id: int, db: AsyncSession = Depends(get_async_session)):
    return await usuario_service.consult_usuario_id(id, db)  # Call the consult_usuario_id method from usuario_service

# Add a new usuario
@router.post('/')
# Define an async function to add a new usuario, with dependency injection for the database session
async def add_usuario(data: Usuario, db: AsyncSession = Depends(get_async_session)):
    return await usuario_service.add_usuario(data, db)  # Call the add_usuario method from usuario_service

# Edit a usuario's details
@router.put('/{id}')
# Define an async function to edit a usuario's details, with dependency injection for the database session
async def edit_usuario(id: int, data: Usuario, db: AsyncSession = Depends(get_async_session)):
    return await usuario_service.edit_usuario(id, data, db)  # Call the edit_usuario method from usuario_service

# Delete a usuario
@router.delete('/{id}')
# Define an async function to delete a usuario, with dependency injection for the database session
async def delete_usuario(id: int, db: AsyncSession = Depends(get_async_session)):
    return await usuario_service.delete_usuario(id, db)  # Call the delete_usuario method from usuario_service

