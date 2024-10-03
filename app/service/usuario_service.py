from fastapi.encoders import jsonable_encoder  # Import JSON encoder for FastAPI
from fastapi.responses import JSONResponse  # Import JSONResponse for sending JSON responses
from app.model.usuario_model import UsuarioModel  # Import the UsuarioModel from the model module
from app.scheme.usuario_scheme import Usuario  # Import the Usuario schema
from sqlalchemy.ext.asyncio import AsyncSession  # Import AsyncSession for asynchronous database operations
from sqlalchemy import and_
from fastapi import HTTPException, status  # Import HTTPException and status codes from FastAPI
from sqlalchemy.future import select  # Import select for constructing SQL queries
from sqlalchemy import delete  # Import delete for constructing delete queries
from logger import Logs  # Import the logging setup

class UsuarioService:
    def __init__(self):
        self.logger = Logs()  # Initialize the logger

    # Consult for every usuario
    async def consult_usuarios(self, db: AsyncSession):
        async with db.begin():  # Begin a database transaction
            result = (await db.execute(select(UsuarioModel))).scalars().all()  # Execute a query to select all usuarios
        self.logger.debug('Consult for every usuario')  # Log the action
        if not result:  # If no usuarios are found
            self.logger.warning('Usuario not found')  # Log a warning
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="There are no usuarios yet")  # Raise a 404 error
        return JSONResponse(status_code=200, content=jsonable_encoder(result))  # Return the result as a JSON response

    # Consult a usuario by name
    async def consult_usuario_id(self, id: int, db: AsyncSession):
        async with db.begin():  # Begin a database transaction
            result = (await db.execute(select(UsuarioModel).filter(and_(UsuarioModel.id_usuario == id)))).scalars().first()  # Execute a query to select a usuario by id
        self.logger.debug('Consult usuario by id')  # Log the action
        if not result:  # If no usuario is found
            self.logger.warning('Usuario not found')  # Log a warning
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuario not found")  # Raise a 404 error
        return JSONResponse(status_code=200, content=jsonable_encoder(result))  # Return the result as a JSON response

    # Add a usuario
    async def add_usuario(self, data: Usuario, db: AsyncSession):
        async with db.begin():  # Begin a database transaction
            new_usuario = UsuarioModel(
                name_usuario=data.name_usuario,
                id_pack=data.id_pack

            )  # Create a new usuario instance
            db.add(new_usuario)  # Add the new usuario to the database session
            await db.commit()  # Commit the transaction
            self.logger.info("A new usuario has been registered")  # Log the action
            return JSONResponse(status_code=201, content={"message": "A new usuario has been registered"})  # Return a success message

    # Edit a usuario
    async def edit_usuario(self, id: int, data: Usuario, db: AsyncSession):
        async with db.begin():  # Begin a database transaction
            usuario_ = (await db.execute(select(UsuarioModel).filter(UsuarioModel.id_usuario == id))).scalars().first()  # Find the usuario by ID
            if not usuario_:  # If no usuario is found
                self.logger.warning('Usuario not found to edit')  # Log a warning
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="There is no usuario with that id")  # Raise a 404 error
            # Update the usuario's details
            usuario_.name_usuario = data.name_usuario
            usuario_.id_pack = data.id_pack
         
            await db.commit()  # Commit the transaction
            self.logger.info('The usuario has been changed')  # Log the action
            return JSONResponse(status_code=200, content={"message": "The usuario has been changed"})  # Return a success message

    # Delete a usuario
    async def delete_usuario(self, id: int, db: AsyncSession):
        async with db.begin():  # Begin a database transaction
            usuario_ = (await db.execute(select(UsuarioModel).filter(UsuarioModel.id_usuario == id))).scalars().first()  # Find the usuario by ID
            if not usuario_:  # If no usuario is found
                self.logger.warning('Usuario not found to delete')  # Log a warning
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="There is no usuario with that id")  # Raise a 404 error
            await db.execute(delete(UsuarioModel).filter(UsuarioModel.id_usuario == id))  # Execute the delete query
            await db.commit()  # Commit the transaction
            self.logger.info('The usuario has been removed')  # Log the action
            return JSONResponse(status_code=200, content={"message": "The usuario has been removed"})  # Return a success message
