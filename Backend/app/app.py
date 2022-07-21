import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config import CONFIG, initiate_database
from models.user import UserModel, UserOut, UserCreate
from models.booking import BookingModel
from routes.users import router as UserRouter

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(UserRouter, prefix="/users", tags=["Users"])


@app.on_event("startup")
async def app_init():
    app.db = await initiate_database()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}