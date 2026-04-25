from fastapi import FastAPI, Depends, HTTPException
from schemas import TodoCreate, Todo as TodoSchema
from sqlalchemy.orm import Session
from database import Base, engine, SessionLocal
from models import Todo

Base.metadata.create_all(bind=engine)  # Create tables based on the models

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configure CORS
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db  # return db
    finally:
        db.close()


# POST - Create TODO
@app.post("/todos", response_model=TodoSchema)
def create(todo: TodoCreate, db: Session = Depends(get_db)):
    db_todo = Todo(**todo.dict())  # Create a new Todo instance from the request data
    db.add(db_todo)  # Add the new Todo to the session
    db.commit()  # Commit the transaction to save the new Todo to the database
    db.refresh(db_todo)  # Refresh the instance to get the generated ID and other fields
    return db_todo  # Return the created Todo


# GET - Read All TODOs
@app.get("/todos", response_model=list[TodoSchema])
def read_todos(db: Session = Depends(get_db)):
    return db.query(Todo).all()  # Return the list of Todo items


# GET - Get single TODO by ID
@app.get("/todos/{todo_id}", response_model=TodoSchema)
def read_todo(todo_id: int, db: Session = Depends(get_db)):
    todo = db.query(Todo).filter(Todo.id == todo_id).first()
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    return todo


# PUT - Update Todo
@app.put("/todos/{todo_id}", response_model=TodoSchema)
def update_todo(todo_id: int, updated: TodoCreate, db: Session = Depends(get_db)):
    todo = db.query(Todo).filter(Todo.id == todo_id).first()
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    for key, value in updated.dict().items():
        setattr(
            todo, key, value
        )  # Update the fields of the existing Todo with the new values
    db.commit()
    db.refresh(todo)
    return todo


# DELETE - Delete Todo
@app.delete("/todos/{todo_id}")
def delete_todo(todo_id: int, db: Session = Depends(get_db)):
    todo = db.query(Todo).filter(Todo.id == todo_id).first()
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    db.delete(todo)
    db.commit()
    return {"message": "Todo deleted successfully"}
