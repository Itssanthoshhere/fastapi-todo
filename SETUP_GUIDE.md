# 🏗️ Todo App - Complete Architecture Guide

## Overview

This is a **full-stack Todo application** with:
- **Backend**: FastAPI (Python)
- **Frontend**: React + TypeScript (Node.js)

Both communicate via REST API over HTTP.

---

## 🎯 System Architecture

```
┌─────────────────────┐
│   React Frontend    │
│  (Vite + TS)        │
│  Port: 5173         │
└──────────┬──────────┘
           │
           │ HTTP Requests
           │ (Axios)
           ↓
┌─────────────────────┐
│   FastAPI Backend   │
│  (Python)           │
│  Port: 8000         │
└──────────┬──────────┘
           │
           ↓
┌─────────────────────┐
│  PostgreSQL DB      │
│  (Local/Cloud)      │
└─────────────────────┘
```

---

## 🚀 Complete Setup Guide

### PART 1: Backend Setup (FastAPI)

#### Step 1: Create Backend Directory

```bash
mkdir fastapi-todo
cd fastapi-todo
```

#### Step 2: Create Virtual Environment

```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

#### Step 3: Install Dependencies

```bash
pip install fastapi uvicorn sqlalchemy psycopg2-binary python-dotenv pydantic
```

#### Step 4: Create `.env` File

```env
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/fastapi_todo
```

#### Step 5: Create PostgreSQL Database

```sql
CREATE DATABASE fastapi_todo;
```

#### Step 6: Run Backend

```bash
uvicorn main:app --reload --port 8000
```

✅ Backend running at: **http://127.0.0.1:8000**
📚 API Docs: **http://127.0.0.1:8000/docs**

---

### PART 2: Frontend Setup (React)

#### Step 1: Create Frontend Directory (Next to Backend)

```bash
# Go back to parent directory
cd ..

# Clone or create frontend
git clone <frontend-repo-url> fastapi-todo-frontend
cd fastapi-todo-frontend
```

#### Step 2: Install Dependencies

```bash
npm install
```

#### Step 3: Configure Backend URL

```bash
cp .env.example .env
```

Edit `.env`:
```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

#### Step 4: Run Frontend

```bash
npm run dev
```

✅ Frontend running at: **http://localhost:5173**

---

## 📁 Project Structure

```
project-root/
│
├── fastapi-todo/                 # Backend
│   ├── venv/                     # Virtual environment
│   ├── main.py                   # API routes
│   ├── database.py               # DB connection
│   ├── models.py                 # SQLAlchemy models
│   ├── schemas.py                # Pydantic schemas
│   ├── requirements.txt
│   └── .env                      # DB credentials
│
└── fastapi-todo-frontend/        # Frontend
    ├── node_modules/
    ├── src/
    │   ├── components/           # React components
    │   │   ├── TodoItem.tsx
    │   │   ├── TodoForm.tsx
    │   │   └── TodoList.tsx
    │   ├── hooks/                # Custom React hooks
    │   │   └── useTodos.ts
    │   ├── services/             # API layer
    │   │   └── api.ts
    │   ├── types/                # TypeScript types
    │   │   └── todo.ts
    │   ├── App.tsx               # Main component
    │   └── main.tsx              # Entry point
    ├── package.json
    ├── tsconfig.json
    ├── vite.config.ts
    ├── tailwind.config.js
    ├── .env                      # API base URL
    └── README.md
```

---

## 🔗 How They Connect

### 1. **Frontend Makes Request**

```typescript
// src/services/api.ts
const response = await this.client.get<Todo[]>('/todos')
```

### 2. **Axios Builds Full URL**

```
Base URL: http://127.0.0.1:8000
Endpoint: /todos
Full URL: http://127.0.0.1:8000/todos
```

### 3. **Backend Receives & Responds**

```python
# main.py
@app.get("/todos", response_model=list[TodoSchema])
def read_todos(db: Session = Depends(get_db)):
    return db.query(Todo).all()
```

### 4. **Frontend Processes Response**

```typescript
const todos = response.data  // Array of Todo objects
setTodos(todos)              // Update React state
```

---

## 🔑 API Endpoints Reference

### Create Todo
```
POST http://127.0.0.1:8000/todos

Request Body:
{
  "title": "Learn React",
  "description": "Master hooks and state management",
  "completed": false
}

Response (200):
{
  "id": 1,
  "title": "Learn React",
  "description": "Master hooks and state management",
  "completed": false
}
```

### Get All Todos
```
GET http://127.0.0.1:8000/todos?skip=0&limit=10

Response (200):
[
  {
    "id": 1,
    "title": "Learn React",
    "description": "Master hooks...",
    "completed": false
  },
  ...
]
```

### Get Single Todo
```
GET http://127.0.0.1:8000/todos/1

Response (200):
{
  "id": 1,
  "title": "Learn React",
  ...
}
```

### Update Todo
```
PUT http://127.0.0.1:8000/todos/1

Request Body:
{
  "title": "Master React",
  "description": "Updated description",
  "completed": true
}

Response (200):
{
  "id": 1,
  "title": "Master React",
  ...
}
```

### Delete Todo
```
DELETE http://127.0.0.1:8000/todos/1

Response (200):
{
  "message": "Todo deleted successfully"
}
```

---

## 🧪 Testing the Connection

### Test 1: API Docs
Open: **http://127.0.0.1:8000/docs**

Try endpoints directly in Swagger UI!

### Test 2: Frontend Console
Open DevTools (F12) → Console

Create a todo and watch network request:

```javascript
// You'll see in Network tab:
// Request: POST http://127.0.0.1:8000/todos
// Response: { id: 1, title: "...", ... }
```

### Test 3: Direct API Call
```bash
curl -X GET http://127.0.0.1:8000/todos
```

---

## 🚨 Troubleshooting

### "Connection Refused" Error

**Problem**: Frontend can't reach backend

**Solutions**:
1. Check backend is running: `http://127.0.0.1:8000/docs`
2. Check `.env` has correct `VITE_API_BASE_URL`
3. CORS might be needed - add to `main.py`:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Database Connection Error

**Problem**: `psycopg2` error

**Solutions**:
1. PostgreSQL running? `sudo service postgresql status`
2. Create DB: `CREATE DATABASE fastapi_todo;`
3. Check `.env` credentials

### Port Already in Use

**Problem**: Port 8000 or 5173 occupied

**Solutions**:
```bash
# Backend - different port
uvicorn main:app --port 8001

# Frontend - different port  
npm run dev -- --port 5174
```

---

## 🌐 Deployment

### Deploy Backend (Render)

1. Push to GitHub
2. Create Render account
3. New → Web Service
4. Connect repo
5. Set environment variables
6. Deploy ✅

### Deploy Frontend (Vercel)

1. Push to GitHub
2. Import on vercel.com
3. Set `VITE_API_BASE_URL` → your deployed backend URL
4. Deploy ✅

---

## 📚 File Explanations

### Frontend Files

| File | Purpose |
|------|---------|
| `src/App.tsx` | Main component, orchestrates everything |
| `src/components/TodoForm.tsx` | Form for creating todos |
| `src/components/TodoItem.tsx` | Individual todo card |
| `src/components/TodoList.tsx` | List view with filtering |
| `src/hooks/useTodos.ts` | State management hook |
| `src/services/api.ts` | HTTP client (Axios) |
| `src/types/todo.ts` | TypeScript types |

### Backend Files (For Reference)

| File | Purpose |
|------|---------|
| `main.py` | API routes (GET/POST/PUT/DELETE) |
| `models.py` | SQLAlchemy database models |
| `schemas.py` | Pydantic validation schemas |
| `database.py` | Database connection setup |
| `.env` | Environment variables (DB URL) |

---

## 🚀 Next Steps

1. Run both frontend & backend locally
2. Open http://localhost:5173
3. Create your first todo
4. Check Network tab in DevTools
5. Study the code
6. Try modifying components
7. Deploy to cloud! 🎉

---

**Questions?** Check:
- Backend README
- Frontend README
- FastAPI docs: http://127.0.0.1:8000/docs
- React docs: https://react.dev

Happy coding! 🎯
