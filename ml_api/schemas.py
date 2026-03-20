from pydantic import BaseModel
from typing import Optional

class LoanRequest(BaseModel):
    Applicant_Income: Optional[float] = None
    Coapplicant_Income: Optional[float] = None
    Age: Optional[int] = None
    Dependents: Optional[int] = None
    Credit_Score: Optional[float] = None
    Existing_Loans: Optional[int] = None
    DTI_Ratio: Optional[float] = None
    Savings: Optional[float] = None
    Collateral_Value: Optional[float] = None
    Loan_Amount: Optional[float] = None
    Loan_Term: Optional[int] = None
    Employment_Status: Optional[str] = None
    Marital_Status: Optional[str] = None
    Loan_Purpose: Optional[str] = None
    Property_Area: Optional[str] = None
    Gender: Optional[str] = None
    Employer_Category: Optional[str] = None
    Education_Level: Optional[str] = None
    model: str