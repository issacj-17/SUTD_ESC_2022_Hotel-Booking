import uvicorn
import webbrowser
import urllib

if __name__ == "__main__":
    host = "127.0.0.1"
    port = 8000
    webbrowser.open(f"http://{host}:{port}/docs")
    uvicorn.run("app:app", host=host,port=port, reload=True)


