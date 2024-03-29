from fastapi import APIRouter, Body, Depends, HTTPException, Response
from typing import List
from datetime import date
from beanie import WriteRules

from app.models.booking import BookingModel, BookingCreate, BookingOut
from app.models.user import UserModel


router = APIRouter()

@router.post("/create", response_model=BookingOut)
async def create_booking(created: BookingCreate):
    model = BookingModel.parse_obj(created.dict(exclude_unset=True))
    await model.create()
    return model

@router.get("/get", response_model=BookingModel)
async def get_booking(bookingRef: str) -> List[BookingModel]:
    booking = await BookingModel.find_one(BookingModel.bookingRef == bookingRef)
    return booking

@router.get("/get/all", response_model=List[BookingModel])
async def get_bookings(email: str) -> List[BookingModel]:
    user = await UserModel.find_one(UserModel.email == email, fetch_links=True)
    bookings = user.bookings
    return bookings

@router.patch("/add", response_model=BookingOut)
async def add_booking(bookingRef: str, email:str):
    bookingModel = await BookingModel.find_one(BookingModel.bookingRef == bookingRef)
    userModel = await UserModel.find_one(UserModel.email == email)
    userModel.bookings.append(bookingModel)
    await userModel.save(link_rule=WriteRules.WRITE)
    return Response(status_code=200)

@router.delete("/delete")
async def delete_user(bookingRef: str):
    booking = await BookingModel.find_one(BookingModel.bookingRef == bookingRef)
    if booking is None:
        raise HTTPException(status_code=404, detail="User Not Found")
    else:
        await BookingModel.find_one(BookingModel.bookingRef == bookingRef).delete()
        return Response(status_code=204)

