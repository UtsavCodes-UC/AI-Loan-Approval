import { Link } from "react-router-dom";
import {
  FaChartPie,
  FaFileAlt,
  FaHistory,
  FaRobot,
  FaHome
} from "react-icons/fa";

function Sidebar() {

  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-[#0A2540] text-white p-6">

      <h2 className="text-2xl font-bold mb-8">
        CreditWise AI
      </h2>

      <ul className="space-y-6">

        <li>
          <Link to="/dashboard" className="flex items-center gap-3 hover:text-gray-300">
            <FaHome /> Dashboard
          </Link>
        </li>

        <li>
          <Link to="/predict" className="flex items-center gap-3 hover:text-gray-300">
            <FaFileAlt /> Loan Prediction
          </Link>
        </li>

        <li>
          <Link to="/history" className="flex items-center gap-3 hover:text-gray-300">
            <FaHistory /> History
          </Link>
        </li>

        <li>
          <Link to="/models" className="flex items-center gap-3 hover:text-gray-300">
            <FaRobot /> Models
          </Link>
        </li>

        <li>
          <Link to="/analytics" className="flex items-center gap-3 hover:text-gray-300">
            <FaChartPie /> Analytics
          </Link>
        </li>

      </ul>

    </div>
  );
}

export default Sidebar;