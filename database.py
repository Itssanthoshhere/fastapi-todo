from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(
    bind=engine, autoflush=False
)  # bind the engine to the sessionmaker and set autoflush to False which means that changes to the database will not be automatically flushed to the database until explicitly committed.

Base = declarative_base()  # create a base class for our models to inherit from
