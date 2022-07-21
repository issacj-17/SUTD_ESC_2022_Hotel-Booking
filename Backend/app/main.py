import uvicorn
from app.settings import SECRET_KEY;

if __name__ == "__main__":
    print(SECRET_KEY)
    uvicorn.run("server.app:app", host="127.0.0.1",port=8000, reload=True)

