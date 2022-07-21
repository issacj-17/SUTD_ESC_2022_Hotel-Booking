from beanie import Document, Link, Indexed
from fastapi.security import HTTPBasicCredentials
from typing import List, Optional
from pydantic import BaseModel, EmailStr, SecretStr, Field
from server.models.booking import BookingModel
from datetime import datetime


class UserAuth(BaseModel):
    email: EmailStr
    password: SecretStr

    class Config:
        json_encoders = {
            SecretStr: lambda val: val.get_secret_value()
        }


class UserUpdate(BaseModel):
    firstName: Optional[str] = None
    lastName: Optional[str] = None
    email: Optional[EmailStr] = None


class UserOut(UserUpdate):
    email: Indexed(EmailStr, unique=True)
    disabled: bool = False


class UserModel(Document, UserOut):
    firstName: str = Field(...)
    lastName: str = Field(...)

    email: Indexed(EmailStr, unique=True) = Field(...)
    password: SecretStr = Field(...)
    disabled: bool = False

    bookings: List[Link[BookingModel]] = []

    def __repr__(self) -> str:
        return f"<User {self.email}>"

    def __str__(self) -> str:
        return self.email

    def __hash__(self) -> int:
        return hash(self.email)

    def __eq__(self, other: object) -> bool:
        if isinstance(other, User):
            return self.email == other.email
        return False

    @property
    def created(self) -> datetime:
        return self.id.generation_time

    @classmethod
    async def by_email(cls, email: str) -> "User":
        return await cls.find_one(cls.email == email)

    class Settings:
        name = "Users"
        bson_encoders = {
            SecretStr: lambda val: val.get_secret_value()
        }