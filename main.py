from app.router import carrera_router
from app.router import usuario_router
import uvicorn
from app.config.db import Base, engine
from fastapi import FastAPI

app = FastAPI(title="Next Step API",description="API para administración de orientador vocacional online")

# endpoints incorporated in API
app.include_router(usuario_router.router)
app.include_router(carrera_router.router)


# function to create all tables in the database if they do not exist
@app.Lifespan("startup")
async def on_startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
        # Ensure the database tables are created using Base - declarative_base instance


# uvicorn app:main --host localhost --port 5000 --reload
if __name__ == "__main__":
    uvicorn.run("main:app", host="localhost", port=5000, reload=True)
