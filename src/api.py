from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware  # <-- Add this import
from pydantic import BaseModel
from retrieve_answer import RetrievalQA


# Initialize FastAPI
app = FastAPI(title="Retrieval QA API")

# Add CORS middleware here
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or list your React frontend URL(s) explicitly
    allow_credentials=True,
    allow_methods=["*"],  # This allows POST, OPTIONS, GET, etc.
    allow_headers=["*"],  # Accept all headers
)

# Initialize Retrieval pipeline once at startup
qa = RetrievalQA()


class QueryRequest(BaseModel):
    question: str


@app.post("/api/answer")
async def get_answer(request: QueryRequest):
    result = qa.answer(request.question)
    return result


@app.get("/")
async def root():
    return {"message": "Retrieval QA API is running. Use POST /api/answer"}
