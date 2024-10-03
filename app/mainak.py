from typing import Union, Optional
from fastapi import FastAPI, Depends
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession  # Import AsyncSession for asynchronous database operations
from config.db import get_async_session 

app = FastAPI()

# Lista inicial de tareas TODO
TODO_LIST = [
    {"id": 1, "task": "Learn FastAPI", "complete": True},
    {"id": 2, "task": "Buy groceries", "complete": False},
    {"id": 3, "task": "Exercise", "complete": False},
]

# Modelos de datos 
class TodoItem(BaseModel):
    id: int
    description: str
    complete: bool

class Usuario(BaseModel):
    id: Optional[int]
    nombre: str
    apellido: str
    edad: int
    cc_aa: str
    provincia: str
    email: str
    centro_estudios: str

class Carrera(BaseModel):
    id : Optional[int]
    titulacion: str
    tipo_estudio: str    


# Enpoints
# Consult all usuarios
@app.get('/')
# Define an async function to consult all usuarios, with dependency injection for the database session
async def consult_usuarios(db: AsyncSession = Depends(get_async_session)):
    return await usuario_service.consult_usuarios(db)  # Call the consult_usuarios method from usuario_service




@app.get("/get_all")
def get_all(complete: Union[bool, None] = None):
    if complete is None:
        return TODO_LIST
    filtered_todos = list(filter(lambda todo: todo["complete"] == complete, TODO_LIST))
    return filtered_todos



# Endpoint POST para crear una nueva tarea TODO
@app.post("/todo")
def create_todo(todo: TodoItem):
    # Convertimos el objeto en diccionario y lo añadimos a la lista
    TODO_LIST.append(todo.model_dump())  
    return TODO_LIST

@app.put("/todo/{todo_id}")
def update_todo(todo_id: int, todo: TodoItem):
    for item in TODO_LIST:
        if item["id"] == todo_id:
            item.update(todo.model_dump())
            return {"message": "Todo updated successfully"}
    return {"error": "Todo not found"}


@app.delete("/todo/{todo_id}")
def delete_todo(todo_id: int):
    for index, item in enumerate(TODO_LIST):
        if item["id"] == todo_id:
            TODO_LIST.pop(index)
            return {"message": "Todo deleted successfully"}
    return {"error": "Todo not found"}


from fastapi import FastAPI, HTTPException

app = FastAPI()

# Lista de tareas de ejemplo
todos = [
    {"id": 1, "title": "Task 1"},
    {"id": 2, "title": "Task 2"}
]

# Endpoint para obtener una tarea por ID
@app.get("/todos/{todo_id}")
def get_todo(todo_id: int):
    # Buscar el todo por ID
    for todo in todos:
        if todo["id"] == todo_id:
            return todo
    # Si no se encuentra, lanzar una excepción HTTP 404
    raise HTTPException(
        status_code=404, 
        detail="TODO not found", 
        headers={"X-Error": "There goes my error"}
    )


