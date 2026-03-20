# 💰 CreditWise AI — Smart Loan Approval System

An end-to-end **AI-powered fintech platform** that predicts loan approvals using machine learning pipeline and provides interactive dashboards, analytics, and real-time insights.

---

## 🚀 Live Demo

🌐 LIVE Website: https://ai-loan-approval-gamma.vercel.app  
⚙️ Backend API: https://login-backend-8fbg.onrender.com  
🧠 ML API: https://loan-ml-api-9e06.onrender.com   

> ⚠️ Note: First request may take a few seconds due to free-tier cold start.

---

## 🎯 Features

### 🔐 Authentication

* Secure login & registration system
* “Login as Guest” option for instant access

### 🤖 AI Loan Prediction

* Predict loan approval using ML models
* Supports multiple models (Logistic Regression, Random Forest, XGBoost, etc.)
* Displays:

  * ✅ Approval / ❌ Rejection
  * 📊 Confidence Score
  * ⚠️ Risk Level

### 🎨 Interactive UI/UX

* Fintech-inspired dashboard design
* Smooth loading states across app
* Form validation with real-world constraints

### 📊 Analytics Dashboard

* Exploratory Data Analysis (EDA) visualizations
* Insights into feature relationships
* Business-driven interpretations

### 🧠 Model Performance Dashboard

* Compare multiple ML models
* Metrics:

  * Accuracy
  * Precision
  * Recall
  * F1 Score
  * ROC-AUC
* Feature importance visualization

### 📁 Prediction History

* Stores user predictions in database
* View detailed inputs & results
* Delete individual or all records

### 📈 Smart Dashboard

* KPI cards (Approval rate, Avg credit score, etc.)
* Recent predictions
* Data-driven insights

---

## 🏗️ Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Recharts
* React Icons

### Backend

* Node.js
* Express.js
* MongoDB Atlas

### Machine Learning

* FastAPI
* Scikit-learn
* XGBoost
* Pandas / NumPy

### Deployment

* Frontend → Vercel
* Backend → Render
* ML API → Render
* Database → MongoDB Atlas

---

## 🧠 ML Pipeline

* Data Cleaning & Preprocessing
* Missing value handling
* Encoding (OneHotEncoder)
* Feature Scaling (StandardScaler)
* Model Training:

  * Logistic Regression
  * KNN
  * Naive Bayes
  * Random Forest
  * XGBoost
* Model Evaluation & Comparison

---

## ⚠️ Known Limitations

* Training dataset has limited feature ranges (income, loan amount)
* Model may not generalize perfectly to real-world large-scale financial data but it is easily adaptable

### 🔧 Improvements (Future Work)

* Use real-world financial datasets
* Feature engineering (loan-to-income ratio, etc.)
* Log transformations for skewed features
* SHAP explainability integration

---

## 📦 Project Structure

```
AI-Loan-Approval/
│
├── frontend/        # React App
├── backend/         # Node.js API
├── ml_api/          # FastAPI ML Service
├── ml/              # Models & preprocessing
```

---

## ⚙️ Setup Instructions (Local)

### 1️⃣ Clone Repo

```bash
git clone https://github.com/UtsavCodes-UC/AI-Loan-Approval.git
cd AI-Loan-Approval
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
npm run dev
```

---

### 3️⃣ ML API Setup

```bash
cd ml_api
pip install -r requirements.txt
uvicorn main:app --reload
```

---

### 4️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## 🔐 Environment Variables

### Backend

```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
FASTAPI_URL=your_fastapi_url
```

### Frontend

```
REACT_APP_API_URL=your_backend_url
```

---

## 🧠 Key Learnings

* Building end-to-end ML pipeline
* Handling real-world UX challenges (loading, validation)
* Deployment of multi-service architecture
* API communication between services
* Designing fintech dashboards

---

## 🏆 Resume Highlight

> Developed and deployed a full-stack AI-powered loan approval system using MERN stack and FastAPI, featuring real-time predictions, model comparison dashboards, and user analytics.

---

## 👨‍💻 Author

**Utsav Patel**   
GitHub: https://github.com/UtsavCodes-UC

---

## ⭐ If you like this project

Give it a star ⭐ — it really helps!
