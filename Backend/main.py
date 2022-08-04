import os
import platform
import uvicorn
import webbrowser
import urllib
from decouple import config

import multiprocessing

if __name__ == "__main__":
    # print(platform.system())
    host = config("HOST")
    port = int(config("PORT"))
    webbrowser.open(f"http://{host}:{port}/docs")
    uvicorn.run("app.app:app", host=host,port=port, reload=True)