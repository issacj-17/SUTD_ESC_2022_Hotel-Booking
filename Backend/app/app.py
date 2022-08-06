import os

from fastapi import FastAPI
from fastapi.testclient import TestClient
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.utils import get_openapi
from decouple import config

from app.settings import initialize_database
from app.routes.users import router as UserRouter
from app.routes.bookings import router as BookingRouter
from app.routes.api import router as APIRouter

app = FastAPI()
client = TestClient(app)

host = config("HOST")
port = config("PORT")

origins = [
    f"http://{host}:{port}",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(UserRouter, prefix="/users", tags=["Users"])
app.include_router(BookingRouter, prefix="/booking", tags=["Booking"])
app.include_router(APIRouter, prefix="/api", tags=["API"])

@app.on_event("startup")
async def app_init():
    app.db = await initialize_database()
    return app.db

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}

@app.get("/schema")
def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema

    openapi_schema = get_openapi(
        title="Hotel Booking Backend",
        version="1.0.0",
        description="OpenAPI Schema for Hotel Booking System",
        routes=app.routes,
    )

    app.openapi_schema = openapi_schema
    return app.openapi_schema