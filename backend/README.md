# CardioGuard AI - Backend

FastAPI backend for the CardioGuard AI cardiovascular disease prediction application.

## Setup

1. **Create a virtual environment** (recommended):
   ```bash
   python -m venv venv
   venv\Scripts\activate  # On Windows
   ```

2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the server**:
   ```bash
   uvicorn main:app --reload
   ```

   The API will be available at `http://localhost:8000`

## API Endpoints

- `GET /` - API information
- `GET /api/health` - Health check
- `POST /api/predict` - Make prediction
- `GET /api/model-info` - Get model information
- `GET /api/metrics` - Get performance metrics
- `GET /api/data-stats` - Get dataset statistics

## API Documentation

Once the server is running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Example Prediction Request

```bash
curl -X POST "http://localhost:8000/api/predict" \
  -H "Content-Type: application/json" \
  -d '{
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
  }'
```

## Model Information

- **Model Type**: Random Forest Classifier
- **Test Accuracy**: 73.21%
- **Training Samples**: 54,837
- **Test Samples**: 13,710
