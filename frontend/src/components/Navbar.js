import { FaSignOutAlt, FaBolt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center bg-white px-6 py-3 shadow">

      <h1 className="text-xl font-semibold text-[#0A2540]">
        CreditWise AI - Loan Approval System
      </h1>

      <div className="flex items-center gap-4">

        <button
          onClick={() => navigate("/predict")}
          className="flex items-center mr-2 gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200"
        >
          <FaBolt />
          Test the Model
        </button>

        <button
          onClick={logout}
          className="flex items-center gap-2 text-red-500 hover:text-red-600"
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>

    </div>
  );
}

export default Navbar;