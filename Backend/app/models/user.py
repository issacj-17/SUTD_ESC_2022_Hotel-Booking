from beanie import Document, Link, Indexed
from fastapi.security import HTTPBasicCredentials
from typing import List, Optional
from pydantic import BaseModel, EmailStr, SecretStr, Field
from datetime import datetime
import orjson as json

from app.models.booking import BookingModel

class UserAuth(BaseModel):
    email: EmailStr
    password: SecretStr

    class Config:
        json_encoders = {
            SecretStr: lambda val: val.get_secret_value()
        }
        json_loads = json.loads
        json_dumps = json.dumps


class UserUpdate(BaseModel):
    firstName: Optional[str] = None
    lastName: Optional[str] = None
    email: EmailStr

    class Config:
        json_loads = json.loads
        json_dumps = json.dumps


class UserOut(UserUpdate):
    email: Indexed(EmailStr, unique=True)
    bookings: List[Link[BookingModel]]
    disabled: bool

    class Config:
        json_loads = json.loads
        json_dumps = json.dumps


class UserCreate(BaseModel):
    firstName: str = Field(...)
    lastName: str = Field(...)

    email: EmailStr = Field(...)
    password: str = Field(...)

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

    class Config:
        json_loads = json.loads
        json_dumps = json.dumps


class UserModel(Document, UserCreate):
    email: Indexed(EmailStr, unique=True) = Field(..., allow_mutation=False)
    password: SecretStr
    disabled: bool = False

    bookings: List[Link[BookingModel]] = []

    @property
    def created(self) -> datetime:
        return self.id.generation_time

    @classmethod
    async def by_email(cls, email: str) -> "UserModel":
        return await cls.find_one(cls.email == email)

    class Settings:
        name = "Users"
        bson_encoders = {
            SecretStr: lambda val: val.get_secret_value(),
        }

    class Config(Document.Config):
        validate_assignment = True
        json_loads = json.loads
        json_dumps = json.dumps