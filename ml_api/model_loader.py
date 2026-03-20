import joblib

models = {
    "logistic_regresssion": joblib.load('../ml/models/Logistic_Regression.pkl'),
    "naive_bias": joblib.load('../ml/models/Naive_Bias.pkl'),
    "knn": joblib.load('../ml/models/KNN.pkl'),
    "random_forest": joblib.load('../ml/models/Random_Forest.pkl'),
    "xgboost": joblib.load('../ml/models/XGBoost.pkl')
}

scaler = joblib.load('../ml/models/scaler.pkl')
encoder = joblib.load('../ml/models/ohe_encoder.pkl')
feature_columns = joblib.load('../ml/models/feature_columns.pkl')