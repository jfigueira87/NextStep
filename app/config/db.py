from typing import AsyncGenerator
from sqlalchemy import MetaData
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import NullPool
from decouple import config
from logger import Logs
import os
from dotenv import load_dotenv


logger = Logs()
load_dotenv() #carga de variables de entorno

try:
    user = os.getenv('USER')
    host= os.getenv("HOST")
    password = os.getenv("PASSWORD")
    db = os.getenv("DB")
    port = os.getenv("PORT")

    url = f"postgresql+asyncpg://{user}:{password}@{host}:{port}/{db}"
   
    

    # Conection with data base... Data base is called 
    engine = create_async_engine(url, poolclass=NullPool)
  
    # MetaData act like a container to save the information on the tables, columns
    # relaciones y otros elementos de la base de datos. Se utiliza para definir y manipular estructuras de la base de datos en SQLAlchemy.
    meta = MetaData()

    Session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
    
    Base = declarative_base()

    async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
        async with Session() as session:
                yield session

    
except SQLAlchemyError as e:
    logger.error("Error to connect database:")
    print(f"Database connection Error: {e}")
    
    
    
