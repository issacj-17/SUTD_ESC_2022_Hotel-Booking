from fastapi import APIRouter, Body, Depends, HTTPException, Response
from typing import List
from models.booking import BookingModel, BookingCreate, BookingOut
from models.user import UserModel
from datetime import date

router = APIRouter()

@router.post("/create", response_model=BookingOut)
async def create_booking(created: BookingCreate):
    model = BookingModel.parse_obj(created.dict(exclude_unset=True))
    await model.create()
    return model

@router.get("/get/all", response_model=List[BookingOut])
async def get_bookings(email: str) -> List[BookingModel]:
    bookings = await UserModel.find_one(cls.email == email).fetch_link(UserModel.bookings)
    return bookings