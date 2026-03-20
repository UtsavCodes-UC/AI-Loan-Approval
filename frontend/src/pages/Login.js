import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import AuthHero from "../components/AuthHero";
import { FaUser } from "react-icons/fa";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingGuest, setLoadingGuest] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");

    } catch {
      alert("Invalid credentials");
    }
    setLoading(false);
  };

  const handleGuestLogin = async (e) => {
    e.preventDefault();
    setLoadingGuest(true);
    try {
      const res = await API.post("/auth/login", {
        email: "guest@gmail.com",
        password: "guest123"
      });

      localStorage.setItem("token", res.data.token);
      navigate('/dashboard');
    }
    catch (error) {
      alert("Guest Login Failed")
    }
    setLoadingGuest(false);
  }

  return (
    <div className="flex h-screen">

      <AuthHero />
      {(loading || loadingGuest) && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-2"></div>
            <p className="text-gray-600">Authenticating...</p>
          </div>
        </div>
      )}

      <div className="flex w-full md:w-1/2 justify-center items-center bg-gray-100">

        <div className="bg-white p-8 rounded-2xl shadow-lg w-96">

          <h2 className="text-2xl font-bold mb-2 text-center">
            Welcome Back
          </h2>

          <p className="text-gray-500 text-sm mb-6 text-center">
            Login to your account
          </p>

          <input
            type="email"
            placeholder="Email"
            className="w-full mb-3 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition duration-200"
          >
            {!loading ? "Login" : "Logging in...Please Wait"}
          </button>

          <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-2 text-gray-500 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <button
            onClick={handleGuestLogin}
            className="w-full mt-4 flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-900 text-white py-2 rounded-lg transition"
          >
            <FaUser />
            {!loadingGuest ? "Login as Guest" : "Logging in...Please Wait"}
          </button>

          <div className="my-4 text-center text-gray-400 text-sm">
            OR
          </div>

          <p className="text-center text-sm">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-semibold hover:underline"
            >
              Create one
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;