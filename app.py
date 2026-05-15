from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd
import numpy as np
import uvicorn
import os

app = FastAPI(title="COVID-19 Analysis API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model and scaler
model = joblib.load("model.pkl")
scaler = joblib.load("scaler.pkl")

class PredictionRequest(BaseModel):
    gdp: float
    social_support: float
    healthy_life: float
    freedom: float

@app.post("/api/predict")
def predict(req: PredictionRequest):
    try:
        features = np.array([[req.gdp, req.social_support, req.healthy_life, req.freedom]])
        scaled_features = scaler.transform(features)
        prediction = model.predict(scaled_features)
        return {"prediction": round(float(prediction[0]), 2)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/data")
def get_data():
    try:
        df = pd.read_csv("processed_data.csv")
        return df.to_dict(orient="records")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Ensure static directory exists
os.makedirs("static", exist_ok=True)

app.mount("/", StaticFiles(directory="static", html=True), name="static")

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000)
