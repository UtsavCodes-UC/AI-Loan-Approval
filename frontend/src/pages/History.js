import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { FaTrash, FaEye } from "react-icons/fa";

function History() {

    const [data, setData] = useState([]);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        API.get("/predict/history")
            .then(res => setData(res.data))
            .catch(() => alert("Failed to load history"));
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this record?")) return;

        await API.delete(`/predict/${id}`);
        fetchData();
    };

    const handleDeleteAll = async () => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete ALL history? This action cannot be undone."
        );

        if (!confirmDelete) return;

        try {
            await API.delete("/predict/all");
            setData([]);
        } catch(error) {
            alert("Failed to delete history");
            console.log(error);
        }
    };

    return (
        <div className="flex">

            <Sidebar />

            <div className="ml-64 flex-1 bg-gray-50 min-h-screen">
                <Navbar />

                <div className="p-6">

                    <div className="flex justify-between items-center mb-6 mr-24">

                        <h2 className="text-2xl font-semibold">
                            Prediction History
                        </h2>

                        <button
                            onClick={handleDeleteAll}
                            disabled={data.length === 0}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${data.length === 0
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-red-600 hover:bg-red-700 text-white"
                                }`}
                        >
                            Delete All
                        </button>

                    </div>

                    <div className="bg-white p-4 rounded-xl shadow">

                        <table className="w-full text-left">

                            <thead className="border-b text-gray-600">
                                <tr>
                                    <th className="p-2">Income</th>
                                    <th className="p-2">Credit</th>
                                    <th className="p-2">Loan</th>
                                    <th className="p-2">Result</th>
                                    <th className="p-2">Risk</th>
                                    <th className="p-2">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {data.slice().reverse().map((item) => (

                                    <tr key={item._id} className="border-b hover:bg-gray-50">

                                        <td className="p-2">
                                            {item.input_data?.Applicant_Income}
                                        </td>

                                        <td className="p-2">
                                            {item.input_data?.Credit_Score}
                                        </td>

                                        <td className="p-2">
                                            {item.input_data?.Loan_Amount}
                                        </td>

                                        <td className={`p-2 font-semibold ${item.prediction === "Approved"
                                            ? "text-green-600"
                                            : "text-red-600"
                                            }`}>
                                            {item.prediction || "N/A"}
                                        </td>

                                        <td className={`p-2 ${item.risk_level === "Low"
                                            ? "text-green-500"
                                            : item.risk_level === "Medium"
                                                ? "text-yellow-500"
                                                : "text-red-500"
                                            }`}>
                                            {item.risk_level}
                                        </td>

                                        <td className="p-2 ml-1 flex gap-4">

                                            <FaEye
                                                className="cursor-pointer text-blue-500 hover:text-blue-700"
                                                onClick={() => setSelected(item)}
                                            />

                                            <FaTrash
                                                className="cursor-pointer text-red-500 hover:text-red-700"
                                                onClick={() => handleDelete(item._id)}
                                            />

                                        </td>

                                    </tr>

                                ))}
                            </tbody>

                        </table>

                    </div>

                </div>
            </div>

            {selected && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">

                    <div className="bg-white p-6 rounded-xl w-[500px] max-h-[80vh] overflow-y-auto">

                        <h3 className="text-xl font-semibold mb-4">
                            Prediction Details
                        </h3>

                        <p><strong>Prediction:</strong> {selected.prediction}</p>
                        <p><strong>Risk:</strong> {selected.risk_level}</p>
                        <p><strong>Confidence:</strong> {(selected.probability * 100).toFixed(2)}%</p>
                        <p><strong>Date:</strong> {new Date(selected.createdAt).toLocaleString()}</p>

                        <h4 className="mt-4 font-semibold">Input Data:</h4>

                        <div className="text-sm text-gray-600 mt-2 space-y-1">
                            {Object.entries(selected.input_data || {}).map(([key, value]) => (
                                <p key={key}>
                                    <strong>{key}:</strong> {value}
                                </p>
                            ))}
                        </div>

                        <button
                            onClick={() => setSelected(null)}
                            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Close
                        </button>

                    </div>

                </div>
            )}

        </div>
    );
}

export default History;