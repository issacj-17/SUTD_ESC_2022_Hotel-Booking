from fastapi import APIRouter, Depends, Response
from fastapi_jwt_auth import AuthJWT

router = APIRouter(prefix="/user", tags=["User"])