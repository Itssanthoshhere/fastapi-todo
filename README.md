
<div align="center">
  <h1>FastAPI Todo API 🚀</h1>
  <p><strong>A minimal yet scalable REST API built with FastAPI, SQLAlchemy, and PostgreSQL</strong></p>

  <div>
    <img src="https://img.shields.io/badge/-FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white"/>
    <img src="https://img.shields.io/badge/-Python-3776AB?style=for-the-badge&logo=python&logoColor=white"/>
    <img src="https://img.shields.io/badge/-SQLAlchemy-D71F00?style=for-the-badge&logo=databricks&logoColor=white"/>
    <img src="https://img.shields.io/badge/-PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white"/>
    <img src="https://img.shields.io/badge/-Pydantic-E92063?style=for-the-badge&logo=pydantic&logoColor=white"/>
    <img src="https://img.shields.io/badge/-Uvicorn-000000?style=for-the-badge&logo=uvicorn&logoColor=white"/>
  </div>

  <p>⚙️ REST API &nbsp;|&nbsp; 🧠 Backend Learning Project &nbsp;|&nbsp; 🚀 Deployment Ready</p>

</div>

---

## 📖 Table of Contents

* [Overview](#-overview)
* [Features](#-features)
* [Tech Stack](#-tech-stack)
* [Architecture](#-architecture)
* [Project Structure](#-project-structure)
* [Quick Start](#-quick-start)
* [Environment Variables](#-environment-variables)
* [API Reference](#-api-reference)
* [Deployment](#-deployment)
* [Roadmap](#-roadmap)

---

## 🎯 Overview

**FastAPI Todo API** is a clean, minimal backend service that demonstrates how to build a real-world REST API using modern Python tools.

It focuses on:

* Clean architecture basics
* Database integration using ORM
* Request validation using Pydantic
* Full CRUD operations

**Real-world use case:**

* Backend for a task management app (web/mobile)
* Starter API for admin dashboards
* Learning backend fundamentals with production mindset

---

## ✨ Features

| Feature                       | Status   |
| ----------------------------- | -------- |
| Create Todo                   | ✅        |
| Get All Todos                 | ✅        |
| Get Todo by ID                | ✅        |
| Update Todo (Partial Support) | ✅        |
| Delete Todo                   | ✅        |
| PostgreSQL Integration        | ✅        |
| Pydantic Validation           | ✅        |
| Dependency Injection          | ✅        |
| Swagger UI Docs               | ✅        |
| Pagination Support            | ❌        |
| Authentication                | ❌        |
| Testing                       | ❌        |

---

## ⚙️ Tech Stack

### Backend

| Layer      | Technology    |
| ---------- | ------------- |
| Framework  | FastAPI       |
| Language   | Python 3      |
| ORM        | SQLAlchemy    |
| Database   | PostgreSQL    |
| Validation | Pydantic v2   |
| Server     | Uvicorn       |
| Config     | python-dotenv |

---

## 🏗️ Architecture

```
Client (Postman / Frontend)
          ↓
     FastAPI Routes
          ↓
   Pydantic Schemas (Validation)
          ↓
   SQLAlchemy ORM (Models)
          ↓
     PostgreSQL Database
```

### Request Flow

1. Client sends request
2. FastAPI receives it
3. Pydantic validates input
4. SQLAlchemy interacts with DB
5. Response returned via schema

---

## 📂 Project Structure

```
fastapi-todo/
├── main.py           # API routes & app entry
├── database.py       # DB connection & session
├── models.py         # SQLAlchemy models
├── schemas.py        # Pydantic schemas
├── .env              # Environment variables
├── .gitignore
├── requirements.txt
```

---

## 🚀 Quick Start

### Prerequisites

* Python 3.10+
* PostgreSQL installed
* pip / virtualenv

---

### 1. Clone the repo

```bash
git clone https://github.com/Itssanthoshhere/fastapi-todo.git
cd fastapi-todo
```

---

### 2. Create virtual environment

```bash
python3 -m venv venv
source venv/bin/activate
```

---

### 3. Install dependencies

```bash
pip install fastapi uvicorn sqlalchemy psycopg2-binary python-dotenv
```

---

### 4. Setup database

Create a PostgreSQL DB:

```sql
CREATE DATABASE fastapi_todo;
```

---

### 5. Run the server

```bash
uvicorn main:app --reload
```

👉 Open in browser:

* Swagger UI: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

## 🔑 Environment Variables

Create `.env` file:

```env
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/fastapi_todo
```

---

## 📡 API Reference

### Todos

#### Create Todo

```
POST /todos
```

#### Get All Todos

```
GET /todos?skip=0&limit=10
```

#### Get Todo by ID

```
GET /todos/{id}
```

#### Update Todo

```
PUT /todos/{id}
```

#### Delete Todo

```
DELETE /todos/{id}
```

---

## 📦 Deployment

### Option 1: Render (Recommended)

1. Push to GitHub
2. Connect repo to Render
3. Set environment variables
4. Deploy 🚀

---

### Option 2: Docker (Optional Upgrade)

```bash
docker build -t fastapi-todo .
docker run -p 8000:8000 fastapi-todo
```

---

## 🗺️ Roadmap

* [ ] Add JWT Authentication 🔐
* [ ] Add user ownership (multi-user support)
* [ ] Add Alembic migrations
* [ ] Add filtering (completed / pending)
* [ ] Add pagination metadata
* [ ] Add unit & integration tests
* [ ] Add Docker + CI/CD pipeline
* [ ] Deploy to cloud (Render / AWS)

---

## 🧠 Learning Highlights

This project demonstrates:

* Building REST APIs with FastAPI
* Using SQLAlchemy ORM effectively
* Structuring backend projects
* Handling validation & serialization
* Writing clean, maintainable backend code

---

## 👤 Author

**Santhosh VS**

* GitHub: [https://github.com/Itssanthoshhere](https://github.com/Itssanthoshhere)
* LinkedIn: [https://www.linkedin.com/in/thesanthoshvs/](https://www.linkedin.com/in/thesanthoshvs/)

---

<div align="center">

**Built with ❤️ using FastAPI & Python**

⭐ Star this repo if you found it useful!

</div>

---
