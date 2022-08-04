from fastapi import APIRouter, HTTPException, Response

from app.models.user import UserModel, UserOut, UserCreate, UserUpdate, UserAuth


router = APIRouter()

@router.post("/create", response_model=UserOut)
async def create_user(user: UserCreate):
    model = UserModel.parse_obj(user.dict(exclude_unset=True))
    await model.create()
    return model

@router.get("/get", response_model=UserModel)
async def get_user(email: str):
    user = await UserModel.by_email(email)
    if user is None:
        raise HTTPException(status_code=404, detail="User Not Found")
    return user

@router.patch("/update", response_model=UserOut)
async def update_user(update: UserUpdate, user: UserAuth):
    if (update.email == user.email):
        model = await UserModel.by_email(update.email)
        model = model.copy(update=update.dict(exclude_unset=True))
        await model.save()
        return model
    else:
        raise HTTPException(status_code=404, detail="User Not Found")

@router.delete("/delete")
async def delete_user(email: str):
    await UserModel.find_one(UserModel.email == email).delete()
    return Response(status_code=204)