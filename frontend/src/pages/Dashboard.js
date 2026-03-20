import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import {
    PieChart,
    Pie,
    Tooltip,
    Cell
} from "recharts";

function Dashboard() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await API.get("/predict/history");
            setData(res.data);
        } catch {
            alert("Failed to load dashboard");
        }
        setLoading(false);
    };


    const total = data.length;
    //console.log(data);

    const approved = data.filter(d => d.prediction === "Approved").length;
    const rejected = total - approved;

    const approvalRate = total ? ((approved / total) * 100).toFixed(1) : 0;

    const avgCredit = total
        ? Math.round(
            data.reduce(
                (acc, d) => acc + Number(d.input_data?.Credit_Score || 0),
                0
            ) / total
        )
        : 0;

    const avgLoan = total
        ? Math.round(
            data.reduce(
                (acc, d) => acc + Number(d.input_data?.Loan_Amount || 0),
                0
            ) / total
        )
        : 0;

    const chartData = [
        { name: "Approved", value: approved },
        { name: "Rejected", value: rejected }
    ];

    const COLORS = ["#00C49F", "#FF4D4F"];

    if (loading) {
        return (
            <div className="flex">
                <Sidebar />

                <div className="ml-64 flex-1 bg-gray-50 min-h-screen">
                    <Navbar />

                    <div className="flex justify-center items-center h-[80vh]">

                        <div className="flex flex-col items-center gap-4">

                            <div className="animate-spin h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full"></div>

                            <p className="text-gray-600 text-lg">
                                Loading dashboard...
                            </p>

                        </div>

                    </div>

                </div>
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div className="flex">
                <Sidebar />

                <div className="ml-64 flex-1 bg-gray-50 min-h-screen">
                    <Navbar />

                    <div className="flex flex-col items-center justify-center h-[80vh] text-center">

                        <div className="text-6xl mb-4">📊</div>

                        <h2 className="text-2xl font-semibold text-[#0A2540] mb-2">
                            No Predictions Yet
                        </h2>

                        <p className="text-gray-500 mb-6 max-w-md">
                            Start analyzing loan applications to view insights, trends, and performance metrics here.
                        </p>

                        <button
                            onClick={() => navigate("/predict")}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg transition"
                        >
                            🚀 Start Prediction
                        </button>

                    </div>

                </div>
            </div>
        );
    }


    return (
        <div className="flex">

            <Sidebar />

            <div className="ml-64 flex-1 bg-gray-50 min-h-screen">
                <Navbar />

                <div className="p-6">

                    <h2 className="text-2xl font-semibold mb-6">
                        Dashboard Overview
                    </h2>

                    <div className="grid grid-cols-4 gap-4 mb-6">

                        <div className="bg-white p-4 rounded-xl shadow">
                            <p className="text-gray-500 text-sm">Total Predictions</p>
                            <h3 className="text-xl font-bold">{total}</h3>
                        </div>

                        <div className="bg-white p-4 rounded-xl shadow">
                            <p className="text-gray-500 text-sm">Approval Rate</p>
                            <h3 className="text-green-600 font-bold">
                                {approvalRate}%
                            </h3>
                        </div>

                        <div className="bg-white p-4 rounded-xl shadow">
                            <p className="text-gray-500 text-sm">Avg Credit Score</p>
                            <h3 className="font-bold">{avgCredit}</h3>
                        </div>

                        <div className="bg-white p-4 rounded-xl shadow">
                            <p className="text-gray-500 text-sm">Avg Loan Amount</p>
                            <h3 className="font-bold">₹{avgLoan.toLocaleString()}</h3>
                        </div>

                    </div>

                    <div className="bg-white p-4 rounded-xl shadow mb-6">

                        <h3 className="font-semibold mb-3">
                            Quick Actions
                        </h3>

                        <div className="flex gap-4">

                            <button
                                onClick={() => navigate("/predict")}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                            >
                                New Prediction
                            </button>

                            <button
                                onClick={() => navigate("/history")}
                                className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
                            >
                                View History
                            </button>

                        </div>

                    </div>

                    <div className="grid grid-cols-2 gap-6">

                        <div className="bg-white p-4 rounded-xl shadow">

                            <h3 className="font-semibold mb-8">
                                Approval Distribution
                            </h3>

                            <PieChart width={300} height={250}>
                                <Pie
                                    data={chartData}
                                    dataKey="value"
                                    outerRadius={100}
                                    label
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={index} fill={COLORS[index]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>

                        </div>

                        <div className="bg-white p-4 rounded-xl shadow">

                            <h3 className="font-semibold mb-3">
                                Recent Predictions
                            </h3>

                            <table className="w-full text-sm">

                                <thead className="border-b text-gray-600">
                                    <tr>
                                        <th className="p-2 text-left">Income</th>
                                        <th className="p-2 text-left">Credit</th>
                                        <th className="p-2 text-left">Result</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {data.slice().reverse().slice(0, 5).map(item => (

                                        <tr key={item._id} className="border-b">

                                            <td className="p-2">
                                                ₹{item.input_data?.Applicant_Income}
                                            </td>

                                            <td className="p-4">
                                                {item.input_data?.Credit_Score}
                                            </td>

                                            <td className={`font-semibold ${item.prediction === "Approved"
                                                ? "text-green-600"
                                                : "text-red-600"
                                                }`}>
                                                {item.prediction}
                                            </td>

                                        </tr>

                                    ))}
                                </tbody>

                            </table>

                        </div>

                    </div>

                    <div className="mt-6 bg-white p-4 rounded-xl shadow">

                        <h3 className="font-semibold mb-2">
                            Insights
                        </h3>

                        <p className="text-gray-600 text-sm">
                            Applicants with higher credit scores and lower DTI ratios show a significantly higher
                            probability of loan approval. Monitoring these factors can help improve approval decisions
                            and reduce financial risk.
                        </p>

                    </div>

                </div>
            </div>

        </div>
    );
}

export default Dashboard;