import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Models() {

    const [metrics, setMetrics] = useState([]);

    useEffect(() => {
        fetch("/model_metrics.json")
            .then(res => res.json())
            .then(data => {

                const formatted = Object.keys(data).map(key => ({
                    name: key,
                    ...data[key]
                }));

                setMetrics(formatted);
            });
    }, []);

    const bestModel =
        metrics.length > 0
            ? metrics.reduce((prev, curr) =>
                curr.roc_auc > prev.roc_auc ? curr : prev
            )
            : null;

    return (
        <div className="flex font-sans">

            <Sidebar />

            <div className="ml-64 flex-1 bg-gray-50 min-h-screen">
                <Navbar />

                <div className="p-8 max-w-6xl mx-auto">

                    <h2 className="text-3xl font-bold text-[#0A2540] mb-4">
                        Model Performance Dashboard
                    </h2>

                    <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                        This section compares multiple machine learning models that this loan approval prediction system is trained on.
                        Each model is evaluated using key performance metrics such as accuracy, precision, recall,
                        F1-score, and ROC-AUC. These metrics help determine the most reliable model for real-world deployment.
                    </p>

                    <div className="bg-white p-6 rounded-xl shadow overflow-x-auto">

                        <h3 className="text-xl font-semibold mb-4">
                            Model Comparison
                        </h3>

                        <table className="w-full text-sm">

                            <thead className="border-b text-gray-600">
                                <tr>
                                    <th className="p-2">Model</th>
                                    <th className="p-2">Accuracy</th>
                                    <th className="p-2">Precision</th>
                                    <th className="p-2">Recall</th>
                                    <th className="p-2">F1 Score</th>
                                    <th className="p-2">ROC-AUC</th>
                                </tr>
                            </thead>

                            <tbody>
                                {metrics.map((m, i) => (
                                    <tr
                                        key={i}
                                        className={`text-center border-b ${bestModel?.name === m.name
                                                ? "bg-green-50 font-semibold"
                                                : ""
                                            }`}
                                    >
                                        <td className="p-2">{m.name}</td>
                                        <td>{m.accuracy.toFixed(2) * 100}%</td>
                                        <td>{m.precision.toFixed(2) * 100}%</td>
                                        <td>{m.recall.toFixed(2) * 100}%</td>
                                        <td>{m.f1_score.toFixed(2) * 100}%</td>
                                        <td className="text-blue-600 font-bold">
                                            {m.roc_auc.toFixed(2) * 100}%
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>

                    </div>

                    {bestModel && (
                        <div className="mt-6 bg-white p-6 rounded-xl shadow">

                            <h3 className="text-xl font-semibold mb-2">
                                Best Performing Model
                            </h3>

                            <p className="text-gray-600">
                                <span className="font-bold text-green-600">
                                    {bestModel.name}
                                </span>{" "}
                                achieved the highest ROC-AUC score, indicating superior ability
                                to distinguish between approved and rejected loans.
                            </p>

                        </div>
                    )}

                    <div className="mt-6 bg-white p-6 rounded-xl shadow">
                        <h3 className="text-xl font-semibold mb-3">
                            Confusion Matrix
                        </h3>

                        <img src="/plots/confusion_matrix.png" alt="cm" />
                        <ul className="list-disc pl-5 text-gray-600 space-y-2">

                            <li>
                                The XGBoost model demonstrates strong performance with a high number of correct predictions, including 124 true negatives (correctly rejected loans) and 58 true positives (correctly approved loans).
                            </li>

                            <li>
                                The number of errors is very low, with only 6 false positives (wrongly approved loans) and 2 false negatives (wrongly rejected loans), indicating high reliability.

                            </li>

                            <li>
                                Precision is high, meaning most of the approved loans are actually safe. This minimizes Type 1 errors (false approvals), which is critical in financial systems to avoid monetary losses.
                            </li>

                            <li>
                                Recall is also very high, showing that the model successfully identifies most of the eligible applicants. This minimizes Type 2 errors (false rejections), ensuring deserving customers are not denied loans.
                            </li>

                            <li>
                                The model achieves a strong balance between precision and recall, making it both risk-aware and opportunity-driven.
                            </li>

                            <li>
                                 Overall, the XGBoost model is well-suited for real-world loan approval systems, as it effectively reduces financial risk while maintaining customer inclusivity.
                            </li>

                        </ul>
                    </div>

                    <div className="mt-6 bg-white p-6 rounded-xl shadow">
                        <h3 className="text-xl font-semibold mb-3">
                            Feature Importance
                        </h3>

                        <img src="/plots/feature_importance.png" alt="fi" />

                        <p className="mt-4 text-gray-600">
                            Features like credit score, income, and DTI ratio contribute the most
                            to the model’s decision-making process. This aligns with real-world
                            financial risk assessment practices.
                        </p>
                    </div>

                    <div className="mt-6 bg-white p-6 rounded-xl shadow">

                        <h3 className="text-xl font-semibold mb-3">
                            Key Insights
                        </h3>

                        <ul className="list-disc pl-5 text-gray-600 space-y-2">

                            <li>
                                Tree-based models (Random Forest, XGBoost) outperform linear models
                                due to their ability to capture non-linear relationships.
                            </li>

                            <li>
                                ROC-AUC is a more reliable metric than accuracy for imbalanced datasets.
                            </li>

                            <li>
                                Feature importance confirms that creditworthiness and financial ratios
                                are primary decision factors.
                            </li>

                            <li>
                                Proper feature engineering significantly improves model performance.
                            </li>

                        </ul>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default Models;