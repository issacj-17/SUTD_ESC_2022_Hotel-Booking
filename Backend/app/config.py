from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseSettings, BaseModel
from decouple import config

from models.user import UserModel
from models.booking import BookingModel


class Settings(BaseSettings):
    """Server config settings"""

    # Mongo Engine settings
    MONGO_URI = config("MONGO_URI")

    # Security settings
    authjwt_secret_key = config("SECRET_KEY")
    # salt = config("SALT").encode()
    #
    # # FastMail SMTP server settings
    # mail_console = config("MAIL_CONSOLE", default=False, cast=bool)
    # mail_server = config("MAIL_SERVER", default="smtp.myserver.io")
    # mail_port = config("MAIL_PORT", default=587, cast=int)
    # mail_username = config("MAIL_USERNAME", default="")
    # mail_password = config("MAIL_PASSWORD", default="")
    # mail_sender = config("MAIL_SENDER", default="noreply@myserver.io")
    # testing = config("TESTING", default=False, cast=bool)


CONFIG = Settings()

async def initiate_database():
    print(CONFIG.MONGO_URI)
    motorDB = AsyncIOMotorClient(CONFIG.MONGO_URI).Ascendas
    await init_beanie(database=motorDB, document_models=[UserModel, BookingModel])