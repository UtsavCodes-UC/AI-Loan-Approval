import { useState, useEffect, useRef } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

function Predict() {

    const [form, setForm] = useState({});
    const [result, setResult] = useState(null);
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [loading, setLoading] = useState(false);

    const { width, height } = useWindowSize();
    const isApproved = result?.prediction === "Approved";

    const resultRef = useRef(null);

    useEffect(() => {
        if (result?.prediction === "Approved") {

            setShowConfetti(false);

            setTimeout(() => {
                setShowConfetti(true);
            }, 100);

            const timer = setTimeout(() => {
                setShowConfetti(false);
            }, 15000);

            return () => clearTimeout(timer);
        }
    }, [result]);

    useEffect(() => {
        if (result && resultRef.current) {
            setTimeout(() => {
                resultRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }, 200);
        }
    }, [result]);

    const requiredFields = [
        "Applicant_Income",
        "Credit_Score",
        "Loan_Amount",
        "DTI_Ratio",
        "Employment_Status",
        "Property_Area"
    ];

    const isFormValid = requiredFields.every(
        (field) => form[field] && form[field] !== ""
    );

    const constraints = {
        Applicant_Income: {
            min: 30000,
            message: "Income should be at least ₹30,000"
        },
        Credit_Score: {
            min: 300,
            max: 900,
            message: "Credit score must be between 300–900"
        },
        Loan_Amount: {
            min: 50000,
            message: "Loan amount should be at least ₹50,000"
        },
        DTI_Ratio: {
            min: 0,
            max: 1,
            message: "DTI ratio must be between 0 and 1"
        },
        Age: {
            min: 21,
            max: 65,
            message: "Age must be between 21 and 65"
        }
    };

    const validateForm = () => {
        const errors = {};

        for (let field in constraints) {
            const value = Number(form[field]);
            const rule = constraints[field];

            if (value) {
                if (rule.min !== undefined && value < rule.min) {
                    errors[field] = rule.message;
                }
                if (rule.max !== undefined && value > rule.max) {
                    errors[field] = rule.message;
                }
            }
        }

        return errors;
    };

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setLoading(true);
        setErrors({});
        setShowConfetti(false);
        const res = await API.post("/predict", {
            ...form,
            model: "xgboost"
        });

        setResult(res.data);
        setLoading(false);
    };

    return (
        <div className="flex">

            <Sidebar />

            <div className="ml-64 flex-1">
                <Navbar />

                <div className="p-6">

                    <h2 className="text-2xl font-semibold mb-6">
                        Loan Risk Prediction
                    </h2>

                    <div className="bg-white p-6 rounded-xl shadow grid grid-cols-2 gap-6">

                        <div>
                            <label>Applicant Income</label>
                            <input
                                name="Applicant_Income"
                                type="number"
                                className={`input ${errors.Applicant_Income ? "border-red-500" : ""
                                    }`}
                                onChange={handleChange}
                            />
                            {errors.Applicant_Income && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.Applicant_Income}
                                </p>
                            )}
                            <p className="text-xs text-gray-500">₹30,000 – ₹2,00,000</p>
                        </div>

                        <div>
                            <label>Credit Score</label>
                            <input name="Credit_Score" type="number"
                                className={`input ${errors.Credit_Score ? "border-red-500" : ""
                                    }`} onChange={handleChange} />
                            {errors.Credit_Score && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.Credit_Score}
                                </p>
                            )}
                            <p className="text-xs text-gray-500">300 – 900</p>
                        </div>

                        <div>
                            <label>Loan Amount</label>
                            <input
                                name="Loan_Amount"
                                type="number"
                                className={`input ${errors.Loan_Amount ? "border-red-500" : ""
                                    }`}
                                onChange={handleChange}
                            />
                            {errors.Loan_Amount && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.Loan_Amount}
                                </p>
                            )}
                            <p className="text-xs text-gray-500">₹50,000 – ₹10,00,000</p>
                        </div>

                        <div>
                            <label>DTI Ratio = ((Total Monthly Debt Payments ÷ Gross Monthly Income)) </label>
                            <input
                                name="DTI_Ratio"
                                type="number"
                                className={`input ${errors.DTI_Ratio ? "border-red-500" : ""
                                    }`}
                                onChange={handleChange}
                            />
                            {errors.DTI_Ratio && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.DTI_Ratio}
                                </p>
                            )}
                            <p className="text-xs text-gray-500">0.1 - 0.5</p>
                        </div>

                        <div>
                            <label>Employment Status</label>
                            <select name="Employment_Status" className="input" onChange={handleChange}>
                                <option value="">Select</option>
                                <option>Salaried</option>
                                <option>Self-Employed</option>
                                <option>Business</option>
                            </select>
                        </div>

                        <div>
                            <label>Property Area</label>
                            <select name="Property_Area" className="input" onChange={handleChange}>
                                <option value="">Select</option>
                                <option>Urban</option>
                                <option>Semi-Urban</option>
                                <option>Rural</option>
                            </select>
                        </div>

                    </div>

                    <div className="mt-4">
                        <button
                            onClick={() => setShowAdvanced(!showAdvanced)}
                            className="flex items-center gap-2 text-blue-600 font-medium"
                        >
                            {showAdvanced ? <FaChevronUp /> : <FaChevronDown />}
                            {showAdvanced ? "Hide Advanced Options" : "Show Advanced Options (For Accurate Predictions)"}
                        </button>
                    </div>

                    {showAdvanced && (
                        <div className="mt-4 bg-white p-6 rounded-xl shadow grid grid-cols-2 gap-6">
                            <input name="Coapplicant_Income" placeholder="Coapplicant Income"
                                className="input" onChange={handleChange} />

                            <input name="Savings" placeholder="Savings"
                                className="input" onChange={handleChange} />

                            <input name="Existing_Loans" placeholder="Existing Loans"
                                className="input" onChange={handleChange} />

                            <input name="Collateral_Value" placeholder="Collateral Value"
                                className="input" onChange={handleChange} />

                            <div className="flex flex-col">
                                <input
                                    name="Age"
                                    type="number"
                                    placeholder="Age(>21)"
                                    className={`input ${errors.Age ? "border-red-500" : ""
                                        }`}
                                    onChange={handleChange}
                                />
                                {errors.Age && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.Age}
                                    </p>
                                )}
                            </div>

                            <input name="Dependents" placeholder="Dependents"
                                className="input" onChange={handleChange} />

                            <select name="Marital_Status" className="input" onChange={handleChange}>
                                <option value="">Marital Status</option>
                                <option>Married</option>
                                <option>Single</option>
                            </select>

                            <select name="Education_Level" className="input" onChange={handleChange}>
                                <option value="">Education</option>
                                <option>Graduate</option>
                                <option>Postgraduate</option>
                                <option>Undergraduate</option>
                            </select>

                            <select name="Loan_Purpose" className="input" onChange={handleChange}>
                                <option value="">Loan Purpose</option>
                                <option>Home</option>
                                <option>Education</option>
                                <option>Personal</option>
                                <option>Business</option>
                            </select>

                            <select name="Employer_Category" className="input" onChange={handleChange}>
                                <option value="">Employer</option>
                                <option>Private</option>
                                <option>Govt</option>
                                <option>Self</option>
                            </select>

                            <select name="Gender" className="input" onChange={handleChange}>
                                <option value="">Gender</option>
                                <option>Male</option>
                                <option>Female</option>
                            </select>

                            <input name="Loan_Term" placeholder="Loan Term (months)"
                                className="input" onChange={handleChange} />

                        </div>

                    )}



                    <button
                        onClick={handleSubmit}
                        disabled={!isFormValid || loading}
                        className={`mt-6 px-6 py-2 rounded flex items-center justify-center gap-2 ${isFormValid && !loading
                                ? "bg-blue-600 hover:bg-blue-700 text-white"
                                : "bg-gray-400 cursor-not-allowed text-white"
                            }`}
                    >
                        {loading ? (
                            <>
                                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                                Predicting...
                            </>
                        ) : (
                            "Predict"
                        )}
                    </button>

                    <div ref={resultRef}>
                        {result && (
                            <>
                                {showConfetti && (
                                    <Confetti
                                        width={width}
                                        height={height + 300}
                                        numberOfPieces={300}
                                        initialVelocityY={10}
                                        recycle={false}
                                    />
                                )}

                                <div
                                    className={`mt-8 p-6 rounded-2xl shadow-lg transition-all duration-500 ${isApproved ? "bg-green-50 border border-green-300"
                                        : "bg-red-50 border border-red-300"
                                        }`}
                                >

                                    <h3
                                        className={`text-2xl font-bold mb-2 ${isApproved ? "text-green-700" : "text-red-700"
                                            }`}
                                    >
                                        {isApproved ? "✅ Loan Approved" : "❌ Loan Rejected"}
                                    </h3>

                                    <p className="text-gray-700">
                                        Confidence Score:{" "}
                                        <span className="font-semibold">
                                            {(result.approval_probability * 100).toFixed(2)}%
                                        </span>
                                    </p>

                                    <p className="text-gray-700 mt-1">
                                        Risk Level:{" "}
                                        <span
                                            className={`font-semibold ${result.risk_level === "Low"
                                                ? "text-green-600"
                                                : result.risk_level === "Medium"
                                                    ? "text-yellow-600"
                                                    : "text-red-600"
                                                }`}
                                        >
                                            {result.risk_level}
                                        </span>
                                    </p>

                                    <div className="mt-4">
                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                            <div
                                                className={`h-3 rounded-full ${isApproved ? "bg-green-500" : "bg-red-500"
                                                    }`}
                                                style={{
                                                    width: `${result.approval_probability * 100}%`
                                                }}
                                            ></div>
                                        </div>
                                    </div>

                                    <p className="mt-4 text-sm text-gray-600">
                                        {isApproved
                                            ? "This applicant meets the risk criteria and is likely to repay the loan successfully."
                                            : "This application carries higher financial risk based on current inputs."}
                                    </p>

                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Predict;