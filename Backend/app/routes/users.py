from fastapi import APIRouter
from models.user import UserModel, UserOut, UserCreate

router = APIRouter()

@router.post("/create", response_model=UserOut)
async def create_user(user: UserCreate):
    userModel = UserModel(firstName=user.firstName, lastName=user.lastName, email=user.email, password=user.password)
    await userModel.create()
    return user

@router.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}