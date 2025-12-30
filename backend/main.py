from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import pickle
import pandas as pd
import numpy as np
from typing import Dict, List
import os

# Initialize FastAPI app
app = FastAPI(
    title="CardioGuard AI - API",
    description="Advanced cardiovascular disease prediction using machine learning",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins in development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model and scaler
MODEL_PATH = os.path.join("..", "cardio_model.pkl")
DATA_PATH = os.path.join("..", "cardio_clean.csv")

try:
    with open(MODEL_PATH, 'rb') as f:
        model_data = pickle.load(f)
        model = model_data['model']
        scaler = model_data['scaler']
    print("✓ Model and scaler loaded successfully")
except Exception as e:
    print(f"✗ Error loading model: {e}")
    model = None
    scaler = None

# Pydantic models
class PredictionRequest(BaseModel):
    gender: int = Field(..., ge=1, le=2, description="Gender: 1=Female, 2=Male")
    height: int = Field(..., ge=100, le=250, description="Height in cm")
    weight: float = Field(..., ge=30, le=200, description="Weight in kg")
    ap_hi: int = Field(..., ge=80, le=200, description="Systolic blood pressure")
    ap_lo: int = Field(..., ge=40, le=140, description="Diastolic blood pressure")
    cholesterol: int = Field(..., ge=1, le=3, description="Cholesterol: 1=Normal, 2=Above normal, 3=Well above normal")
    gluc: int = Field(..., ge=1, le=3, description="Glucose: 1=Normal, 2=Above normal, 3=Well above normal")
    smoke: int = Field(..., ge=0, le=1, description="Smoking: 0=No, 1=Yes")
    alco: int = Field(..., ge=0, le=1, description="Alcohol: 0=No, 1=Yes")
    active: int = Field(..., ge=0, le=1, description="Physical activity: 0=No, 1=Yes")
    age_years: int = Field(..., ge=30, le=80, description="Age in years")
    BMI: float = Field(..., ge=10, le=60, description="Body Mass Index")

    class Config:
        json_schema_extra = {
            "example": {
                "gender": 2,
                "height": 168,
                "weight": 62.0,
                "ap_hi": 110,
                "ap_lo": 80,
                "cholesterol": 1,
                "gluc": 1,
                "smoke": 0,
                "alco": 0,
                "active": 1,
                "age_years": 50,
                "BMI": 21.97
            }
        }

class PredictionResponse(BaseModel):
    prediction: int
    probability: float
    risk_level: str
    message: str

class ModelInfo(BaseModel):
    model_type: str
    parameters: Dict
    features: List[str]
    training_samples: int
    test_samples: int

class ModelMetrics(BaseModel):
    test_accuracy: float
    train_accuracy: float
    precision: float
    recall: float
    f1_score: float
    confusion_matrix: List[List[int]]

class DataStats(BaseModel):
    total_samples: int
    features: List[str]
    target_distribution: Dict[str, int]
    feature_stats: Dict

# API Endpoints
@app.get("/")
async def root():
    return {
        "message": "CardioGuard AI - Cardiovascular Disease Prediction API",
        "version": "1.0.0",
        "endpoints": {
            "health": "/api/health",
            "predict": "/api/predict",
            "model_info": "/api/model-info",
            "metrics": "/api/metrics",
            "data_stats": "/api/data-stats"
        }
    }

@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "model_loaded": model is not None,
        "scaler_loaded": scaler is not None
    }

@app.post("/api/predict", response_model=PredictionResponse)
async def predict(request: PredictionRequest):
    """Make a prediction for cardiovascular disease"""
    if model is None or scaler is None:
        raise HTTPException(status_code=500, detail="Model not loaded")
    
    try:
        # Prepare input data
        input_data = pd.DataFrame([{
            'gender': request.gender,
            'height': request.height,
            'weight': request.weight,
            'ap_hi': request.ap_hi,
            'ap_lo': request.ap_lo,
            'cholesterol': request.cholesterol,
            'gluc': request.gluc,
            'smoke': request.smoke,
            'alco': request.alco,
            'active': request.active,
            'age_years': request.age_years,
            'BMI': request.BMI
        }])
        
        # Scale the input
        input_scaled = scaler.transform(input_data)
        
        # Make prediction
        prediction = int(model.predict(input_scaled)[0])
        probability = float(model.predict_proba(input_scaled)[0][1])
        
        # Determine risk level
        if probability < 0.3:
            risk_level = "Low Risk"
            message = "Low probability of cardiovascular disease. Maintain a healthy lifestyle!"
        elif probability < 0.6:
            risk_level = "Moderate Risk"
            message = "Moderate risk detected. Consider consulting a healthcare professional."
        else:
            risk_level = "High Risk"
            message = "High risk detected. Please consult a healthcare professional soon."
        
        return PredictionResponse(
            prediction=prediction,
            probability=round(probability * 100, 2),
            risk_level=risk_level,
            message=message
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

@app.get("/api/model-info", response_model=ModelInfo)
async def get_model_info():
    """Get model information"""
    if model is None:
        raise HTTPException(status_code=500, detail="Model not loaded")
    
    return ModelInfo(
        model_type="Random Forest Classifier",
        parameters={
            "n_estimators": 200,
            "max_depth": 10,
            "min_samples_leaf": 1,
            "min_samples_split": 5,
            "max_features": "sqrt",
            "random_state": 42
        },
        features=[
            "gender", "height", "weight", "ap_hi", "ap_lo",
            "cholesterol", "gluc", "smoke", "alco", "active",
            "age_years", "BMI"
        ],
        training_samples=54837,
        test_samples=13710
    )

@app.get("/api/metrics", response_model=ModelMetrics)
async def get_metrics():
    """Get model performance metrics"""
    return ModelMetrics(
        test_accuracy=73.21,
        train_accuracy=74.95,
        precision=0.75,
        recall=0.68,
        f1_score=0.71,
        confusion_matrix=[
            [5423, 1536],
            [2143, 4608]
        ]
    )

@app.get("/api/data-stats", response_model=DataStats)
async def get_data_stats():
    """Get dataset statistics"""
    try:
        df = pd.read_csv(DATA_PATH)
        
        return DataStats(
            total_samples=68547,
            features=[
                "gender", "height", "weight", "ap_hi", "ap_lo",
                "cholesterol", "gluc", "smoke", "alco", "active",
                "cardio", "age_years", "BMI"
            ],
            target_distribution={
                "No Disease": int(df[df['cardio'] == 0].shape[0]),
                "Has Disease": int(df[df['cardio'] == 1].shape[0])
            },
            feature_stats={
                "age_range": f"{int(df['age_years'].min())}-{int(df['age_years'].max())} years",
                "avg_bmi": round(float(df['BMI'].mean()), 2),
                "gender_distribution": {
                    "Female": int(df[df['gender'] == 1].shape[0]),
                    "Male": int(df[df['gender'] == 2].shape[0])
                }
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error loading data: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
