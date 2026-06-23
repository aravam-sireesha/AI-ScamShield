from fastapi import FastAPI
from app.api.phishing import router as phishing_router

app = FastAPI(
    title="AI ScamShield API",
    version="1.0.0"
)

app.include_router(phishing_router)

@app.get("/")
def home():
    return {
        "status": "running",
        "project": "AI ScamShield"
    }