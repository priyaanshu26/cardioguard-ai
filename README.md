# CardioGuard AI

**Advanced Cardiovascular Disease Prediction System**

A full-stack machine learning application for predicting cardiovascular disease risk using Random Forest classification. The system features a FastAPI backend and a modern React frontend with glassmorphism UI design.

![Project Banner](https://img.shields.io/badge/CardioGuard%20AI-Heart%20Disease%20Prediction-blue)
![Python](https://img.shields.io/badge/Python-3.8+-green)
![React](https://img.shields.io/badge/React-18.0+-61DAFB)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109+-009688)
![Accuracy](https://img.shields.io/badge/Accuracy-73.21%25-success)

## 🎯 Project Overview

This project implements a cardiovascular disease prediction system using machine learning. The model is trained on 68,547 patient records and achieves 73.21% test accuracy using a Random Forest classifier.

### Key Features

- ✅ **High Accuracy**: 73.21% test accuracy with Random Forest model
- ⚡ **Fast Predictions**: Instant risk assessment
- 📊 **Data-Driven**: Trained on extensive medical dataset
- 🎨 **Modern UI**: Glassmorphism design with smooth animations
- 🌓 **Dark Mode**: Full light/dark theme support
- 📱 **Responsive**: Works on mobile, tablet, and desktop
- 🔒 **Privacy First**: Local processing, no data storage

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (React)                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐ │
│  │   Home   │  │ Predict  │  │  Model   │  │  Data   │ │
│  │   Page   │  │   Page   │  │   Info   │  │ Insights│ │
│  └──────────┘  └──────────┘  └──────────┘  └─────────┘ │
└─────────────────────────────────────────────────────────┘
                         │ HTTP/REST API
                         ▼
┌─────────────────────────────────────────────────────────┐
│                   Backend (FastAPI)                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐ │
│  │ Predict  │  │  Model   │  │ Metrics  │  │  Data   │ │
│  │ Endpoint │  │   Info   │  │ Endpoint │  │  Stats  │ │
│  └──────────┘  └──────────┘  └──────────┘  └─────────┘ │
└─────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│              ML Model (Random Forest)                    │
│  ┌──────────────────────────────────────────────────┐   │
│  │  cardio_model.pkl (Model + Scaler)               │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

## 📊 Model Performance

| Metric | Value |
|--------|-------|
| Test Accuracy | 73.21% |
| Train Accuracy | 74.95% |
| Precision | 75% |
| Recall | 68% |
| F1-Score | 71% |

### Confusion Matrix

|  | Predicted: No Disease | Predicted: Has Disease |
|--|----------------------|------------------------|
| **Actual: No Disease** | 5,423 (TN) | 1,536 (FP) |
| **Actual: Has Disease** | 2,143 (FN) | 4,608 (TP) |

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Start the server:
   ```bash
   uvicorn main:app --reload
   ```

   Backend will run at `http://localhost:8000`

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

   Frontend will run at `http://localhost:5173`

## 📁 Project Structure

```
ML Project/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── requirements.txt     # Python dependencies
│   └── README.md            # Backend documentation
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── context/         # React context
│   │   ├── utils/           # Utility functions
│   │   └── index.css        # Global styles
│   ├── package.json         # Node dependencies
│   ├── tailwind.config.js   # Tailwind configuration
│   └── README.md            # Frontend documentation
├── cardio_model.pkl         # Trained ML model
├── cardio_clean.csv         # Cleaned dataset
├── Model.ipynb              # Model training notebook
├── EDA.ipynb                # Exploratory data analysis
└── README.md                # This file
```

## 🔬 Dataset

- **Total Samples**: 68,547
- **Features**: 12 (gender, height, weight, blood pressure, cholesterol, glucose, lifestyle factors, age, BMI)
- **Target**: Cardiovascular disease (binary: 0 = No, 1 = Yes)
- **Source**: Cardiovascular Disease Dataset

### Features Used

1. **Gender** - Patient gender (1: Female, 2: Male)
2. **Height** - Height in cm
3. **Weight** - Weight in kg
4. **Systolic BP** - Systolic blood pressure (mmHg)
5. **Diastolic BP** - Diastolic blood pressure (mmHg)
6. **Cholesterol** - Cholesterol level (1: Normal, 2: Above normal, 3: Well above normal)
7. **Glucose** - Glucose level (1: Normal, 2: Above normal, 3: Well above normal)
8. **Smoking** - Smoking status (0: No, 1: Yes)
9. **Alcohol** - Alcohol intake (0: No, 1: Yes)
10. **Physical Activity** - Physical activity (0: No, 1: Yes)
11. **Age** - Age in years
12. **BMI** - Body Mass Index

## 🛠️ Technology Stack

### Backend
- **FastAPI** - Modern Python web framework
- **Scikit-learn** - Machine learning library
- **Pandas** - Data manipulation
- **Uvicorn** - ASGI server
- **Pydantic** - Data validation

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Routing
- **Axios** - HTTP client

### Machine Learning
- **Algorithm**: Random Forest Classifier
- **Preprocessing**: StandardScaler normalization
- **Hyperparameter Tuning**: GridSearchCV with 5-fold CV
- **Training Split**: 80/20 train-test split

## 📱 Features

### Home Page
- Hero section with project overview
- Key features showcase
- Model accuracy statistics
- Call-to-action buttons

### Prediction Page
- Interactive form for all 12 features
- Auto-calculated BMI
- Real-time prediction results
- Risk level visualization
- Probability display

### Model Info Page
- Model architecture details
- Hyperparameters
- Performance metrics
- Confusion matrix
- Training methodology

### Data Insights Page
- Dataset statistics
- Target distribution
- Gender distribution
- Feature descriptions
- Data cleaning steps

### Disclaimer Page
- Medical disclaimer
- Model limitations
- Intended use
- Data privacy
- Emergency notice

## ⚠️ Disclaimer

**This system is for educational purposes only and should NOT be used as a substitute for professional medical advice.** Always consult with a qualified healthcare provider for medical decisions.

## 👨‍💻 Author

**Priyanshu Choudhary**
- Roll Number: 23010101052
- Institution: Darshan University
- Course: ML & DL Project (Semester 6)

## 📄 License

This project is created for educational purposes as part of academic coursework.

## 🙏 Acknowledgments

- Dataset source: Cardiovascular Disease Dataset
- Darshan University for academic support
- ML & DL course instructors

---

**Note**: For detailed setup instructions, please refer to the README files in the `backend` and `frontend` directories.
