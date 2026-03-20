from fastapi import FastAPI
import pandas as pd
from schemas import LoanRequest
from model_loader import models, scaler, encoder, feature_columns

app = FastAPI(title='CreditWise ML API')

@app.get('/')
def home():
    return {"message": "CreditWise Loan Approval API"}

@app.post('/predict')
def predict(data: LoanRequest):
    input_dict = data.dict()
    model_name = input_dict.pop('model')

    defaults = {
        "Applicant_Income": 50000,
        "Coapplicant_Income": 0,
        "Age": 30,
        "Dependents": 1,
        "Credit_Score": 700,
        "Existing_Loans": 0,
        "DTI_Ratio": 0.3,
        "Savings": 100000,
        "Collateral_Value": 200000,
        "Loan_Amount": 200000,
        "Loan_Term": 240,
        "Employment_Status": "Salaried",
        "Marital_Status": "Married",
        "Loan_Purpose": "Home",
        "Property_Area": "Urban",
        "Gender": "Male",
        "Employer_Category": "Private",
        "Education_Level": "Graduate"
    }

    for key, value in input_dict.items():
        if value is None:
            input_dict[key] = defaults[key]

    df = pd.DataFrame([input_dict])

    df["Total_Income"] = df["Applicant_Income"] + df["Coapplicant_Income"]

    df["Loan_Income_Ratio"] = df["Loan_Amount"] / df["Total_Income"]

    df["Savings_Ratio"] = df["Savings"] / df["Loan_Amount"]

    categorical_cols = [
        "Employment_Status",
        "Marital_Status",
        "Loan_Purpose",
        "Property_Area",
        "Gender",
        "Employer_Category",
        "Education_Level"
    ]

    encoded = encoder.transform(df[categorical_cols])
    encoded_df = pd.DataFrame(encoded, columns=encoder.get_feature_names_out(categorical_cols), index=df.index)
    df = pd.concat([df.drop(columns=categorical_cols), encoded_df], axis=1)

    df = df.reindex(columns=feature_columns, fill_value=0)

    numeric_cols = [
        "Applicant_Income",
        "Coapplicant_Income",
        "Age",
        "Dependents",
        "Credit_Score",
        "Existing_Loans",
        "DTI_Ratio",
        "Savings",
        "Collateral_Value",
        "Loan_Amount",
        "Loan_Term",
        "Total_Income",
        "Loan_Income_Ratio",
        "Savings_Ratio"
    ]
    df[numeric_cols] = scaler.transform(df[numeric_cols])

    model = models[model_name]
    pred = model.predict(df)[0]
    prob = model.predict_proba(df)[0][1]
    risk='Low'
    result = "Approved" if pred==1 else "Rejected"
    if prob < 0.4:
        risk = 'High'
    elif prob < 0.7:
        risk = 'Medium'

    return {
        "prediction": result,
        "approval_probability": round(float(prob), 3),
        "risk_level": risk,
        "model": model_name,
    }




