from fastapi import FastAPI, Depends
from schemas import TodoCreate, Todo as TodoSchema
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Todo

app = FastAPI()


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
