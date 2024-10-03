from fastapi.encoders import jsonable_encoder  # Import JSON encoder for FastAPI
from fastapi.responses import JSONResponse  # Import JSONResponse for sending JSON responses
from app.model.carrera_model import CarreraModel  # Import the carreraModel from the model module
from app.scheme.carrera_scheme import Carrera  # Import the carrera schema
from sqlalchemy.ext.asyncio import AsyncSession  # Import AsyncSession for asynchronous database operations
from sqlalchemy import and_
from fastapi import HTTPException, status  # Import HTTPException and status codes from FastAPI
from sqlalchemy.future import select  # Import select for constructing SQL queries
from sqlalchemy import delete  # Import delete for constructing delete queries


class carreraService:
    def __init__(self):
        self.logger = Logs()  # Initialize the logger

    # Consult for every carrera
    async def consult_carreras(self, db: AsyncSession):
        async with db.begin():  # Begin a database transaction
            result = (await db.execute(select(CarreraModel))).scalars().all()  # Execute a query to select all carreras
        self.logger.debug('Consult for every carrera')  # Log the action
        if not result:  # If no carreras are found
            self.logger.warning('carrera not found')  # Log a warning
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="There are no carreras yet")  # Raise a 404 error
        return JSONResponse(status_code=200, content=jsonable_encoder(result))  # Return the result as a JSON response

    # Consult a carrera by name
    async def consult_carrera_id(self, id: int, db: AsyncSession):
        async with db.begin():  # Begin a database transaction
            result = (await db.execute(select(CarreraModel).filter(and_(CarreraModel.id_carrera == id)))).scalars().first()  # Execute a query to select a carrera by id
        self.logger.debug('Consult carrera by id')  # Log the action
        if not result:  # If no carrera is found
            self.logger.warning('carrera not found')  # Log a warning
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="carrera not found")  # Raise a 404 error
        return JSONResponse(status_code=200, content=jsonable_encoder(result))  # Return the result as a JSON response

    # Add a carrera
    async def add_carrera(self, data: Carrera, db: AsyncSession):
        async with db.begin():  # Begin a database transaction
            new_carrera = CarreraModel(
                name_carrera=data.name_carrera,
                id_pack=data.id_pack

            )  # Create a new carrera instance
            db.add(new_carrera)  # Add the new carrera to the database session
            await db.commit()  # Commit the transaction
            self.logger.info("A new carrera has been registered")  # Log the action
            return JSONResponse(status_code=201, content={"message": "A new carrera has been registered"})  # Return a success message

    # Edit a carrera
    async def edit_carrera(self, id: int, data: Carrera, db: AsyncSession):
        async with db.begin():  # Begin a database transaction
            carrera_ = (await db.execute(select(CarreraModel).filter(CarreraModel.id_carrera == id))).scalars().first()  # Find the carrera by ID
            if not carrera_:  # If no carrera is found
                self.logger.warning('carrera not found to edit')  # Log a warning
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="There is no carrera with that id")  # Raise a 404 error
            # Update the carrera's details
            carrera_.name_carrera = data.name_carrera
            carrera_.id_pack = data.id_pack
         
            await db.commit()  # Commit the transaction
            self.logger.info('The carrera has been changed')  # Log the action
            return JSONResponse(status_code=200, content={"message": "The carrera has been changed"})  # Return a success message

    # Delete a carrera
    async def delete_carrera(self, id: int, db: AsyncSession):
        async with db.begin():  # Begin a database transaction
            carrera_ = (await db.execute(select(CarreraModel).filter(CarreraModel.id_carrera == id))).scalars().first()  # Find the carrera by ID
            if not carrera_:  # If no carrera is found
                self.logger.warning('carrera not found to delete')  # Log a warning
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="There is no carrera with that id")  # Raise a 404 error
            await db.execute(delete(CarreraModel).filter(CarreraModel.id_carrera == id))  # Execute the delete query
            await db.commit()  # Commit the transaction
            self.logger.info('The carrera has been removed')  # Log the action
            return JSONResponse(status_code=200, content={"message": "The carrera has been removed"})  # Return a success message
