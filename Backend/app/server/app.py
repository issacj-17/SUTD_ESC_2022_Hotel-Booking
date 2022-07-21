from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient

from app.settings import MONGO_URL
from server.models.user import UserModel
from server.models.booking import BookingModel

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

# app.include_router(BookingRouter)
# app.include_router(UserRouter)
# app.include_router(AuthRouter)
# app.include_router(RegisterRouter)


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}

@app.on_event("startup")
async def app_init():
    app.db = AsyncIOMotorClient(MONGO_URL).account
    await init_beanie(app.db, document_models=[UserModel, BookingModel])