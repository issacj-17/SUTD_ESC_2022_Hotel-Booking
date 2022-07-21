import os
from datetime import date
from beanie import Document, Indexed
from pydantic import BaseModel, Field, EmailStr
from bson import ObjectId
from typing import Optional, List
from datetime import datetime

class DisplayInfo(BaseModel):
    numOfNights: int = Field(..., allow_mutation=False)
    startDate: date = Field(..., allow_mutation=False)
    endDate: date = Field(..., allow_mutation=False)

    adults: int = Field(..., allow_mutation=False)
    children: int = Field(..., allow_mutation=False)
    roomType: List[str] = Field(..., allow_mutation=False)
    message: Optional[str] = None

    class Config:
        validate_assignment = True


class BookingModel(Document):
    name: str = Field(...)
    contactNum: str = Field(...)
    email: EmailStr = Field(...)
    guests: List[dict] = []

    destID: str = Field(..., allow_mutation=False, max_length=4)
    hotelID: str = Field(..., allow_mutation=False, max_length=4)
    displayInfo: DisplayInfo
    price: float = Field(..., allow_mutation=False, gt=0.0)

    supplierID: str = Field(..., allow_mutation=False)
    supplierRes: List[dict] = []

    bookingRef: Indexed(str, unique=True) = Field(..., allow_mutation=False)

    def __repr__(self) -> str:
        return f"<Booking {self.bookingRef}>"

    def __str__(self) -> str:
        return self.bookingRef

    def __hash__(self) -> int:
        return hash(self.bookingRef)

    def __eq__(self, other: object) -> bool:
        if isinstance(other, User):
            return self.bookingRef == other.bookingRef
        return False

    @property
    def created(self) -> datetime:
        """Datetime user was created from ID"""
        return self.id.generation_time

    class Settings:
        name: str = "Bookings"

    class Config(Document.Config):
        validate_assignment = True
        # arbitrary_types_allowed = True