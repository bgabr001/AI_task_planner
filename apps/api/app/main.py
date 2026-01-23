from datetime import datetime
from typing import Optional

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.services.priority import compute_priority

app = FastAPI(title="AI Task Planner API", version="0.1.0")

# Allow the Next.js dev server to call this API locally
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#Allow the Next.js dev server to call this API locally
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#models
class TaskCreate(BaseModel):
    title: str
    importance: int
    urgenycy: int
    effort: int
    due_date: Optional[datetime] = None

class TaskResponse(BaseModel):
    priority: float

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/tasks", response_model=TaskResponse)
def create_task(task: TaskCreate):
    priority = compute_priority(
        importance=task.importance,
        urgency=task.urgency,
        effort=task.effort,
        due_date=task.due_date,
    )
    return TaskResponse(
        **task.model_dump(),
        priority=priority,
    )