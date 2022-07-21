import os
from datetime import date
from beanie import Document, Indexed
from pydantic import BaseModel, Field, EmailStr, SecretStr, validator, ValidationError
from bson import ObjectId
from typing import Optional, List
from datetime import datetime
import orjson as json

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
        json_loads = json.loads
        json_dumps = json.dumps
        json_encoders = {
            datetime.date: lambda dt: dt.date()
        }


class PaymentInfo(BaseModel):
    paymentID: SecretStr = Field(..., allow_mutation=False)
    payeeID: SecretStr = Field(..., allow_mutation=False)

    class Config:
        validate_assignment = True
        json_loads = json.loads
        json_dumps = json.dumps
        json_encoders = {
            SecretStr: lambda val: val.get_secret_value()
        }

class GuestInfo(BaseModel):
    salutation: Optional[str]
    firstName: SecretStr = Field(...)
    lastName: SecretStr = Field(...)
    phone: SecretStr = Field(...)
    email: EmailStr = Field(...)

    class Config:
        validate_assignment = True
        json_loads = json.loads
        json_dumps = json.dumps
        json_encoders = {
            SecretStr: lambda val: val.get_secret_value()
        }

class BookingOut(BaseModel):
    destID: str
    hotelID: str
    price: float

    display: DisplayInfo

    supplierID: str
    supplierRes: List

    bookingRef: Indexed(str, unique=True)
    guest: GuestInfo
    payment: PaymentInfo

    class Config:
        json_loads = json.loads
        json_dumps = json.dumps


class BookingCreate(BaseModel):
    destID: str = Field(..., max_length=4)
    hotelID: str = Field(..., max_length=4)
    price: float = Field(..., gt=0.0)
    bookingRef: str = Field(...)

    supplierID: str = Field(...)
    supplierRes: List = []

    display: DisplayInfo
    guest: GuestInfo
    payment: PaymentInfo

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

    class Config:
        validate_assignment = True
        json_loads = json.loads
        json_dumps = json.dumps


class BookingModel(Document, BookingCreate):
    destID: str = Field(..., allow_mutation=False, max_length=4)
    hotelID: str = Field(..., allow_mutation=False, max_length=4)
    display: DisplayInfo
    price: float = Field(..., allow_mutation=False, gt=0.0)

    supplierID: str = Field(..., allow_mutation=False)
    supplierRes: List = []

    bookingRef: Indexed(str, unique=True) = Field(..., allow_mutation=False)
    guest: GuestInfo
    payment: PaymentInfo

    @property
    def created(self) -> datetime:
        """Datetime user was created from ID"""
        return self.id.generation_time

    class Settings:
        name: str = "Bookings"

    class Config(Document.Config):
        validate_assignment = True
        # arbitrary_types_allowed = True