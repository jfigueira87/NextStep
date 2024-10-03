from typing import AsyncGenerator
from sqlalchemy import MetaData
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import NullPool
from logger import Logs
import os
from dotenv import load_dotenv

# Definir la base para los modelos
Base = declarative_base()

# Inicializar el logger y cargar las variables de entorno
logger = Logs()
load_dotenv()

try:
    # Cargar variables de entorno
    user = os.getenv('USER')
    host = os.getenv("HOST")
    password = os.getenv("PASSWORD")
    db = os.getenv("DB")
    port = os.getenv("PORT")
    url = os.getenv("DATABASE_URL")

    # Si no existe una URL en las variables de entorno, formatearla manualmente
    if not url:
        url = f"postgresql+asyncpg://{user}:{password}@{host}:{port}/{db}"
    
    # Crear el motor de base de datos asíncrono
    engine = create_async_engine(url, poolclass=NullPool)

    # MetaData actúa como un contenedor para la información sobre las tablas, columnas, etc.
    meta = MetaData()

    # Crear la sesión asíncrona
    Session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

except SQLAlchemyError as e:
    # Manejar errores de conexión
    logger.error("Error to connect database:")
    print(f"Database connection Error: {e}")

# Definir la función para obtener una sesión asíncrona fuera del bloque try-except
async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    async with Session() as session:
        yield session
