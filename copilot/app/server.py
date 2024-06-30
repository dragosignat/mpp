from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from sql_ollama import chain as sql_ollama_chain
from langserve import add_routes
from .dto import Reviews
from .handle_sentiment import handle_sentiment

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

@app.get("/")
async def redirect_root_to_docs():
    return RedirectResponse("/docs")

@app.post("/sentiment")
async def sentiment(reviews: Reviews):
    return handle_sentiment(reviews)


# Edit this to add the chain you want to add
add_routes(app, sql_ollama_chain, path="/copilot")

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
