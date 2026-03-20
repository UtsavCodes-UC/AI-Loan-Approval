import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import AuthHero from "../components/AuthHero";

function Register() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await API.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password
      });

      alert("Account created successfully!");

      navigate("/");

    } catch {
      alert("Email already exists!");
    }
  };

  return (
    <div className="flex h-screen">

      <AuthHero />

      <div className="flex w-full md:w-1/2 justify-center items-center bg-gray-100">

        <div className="bg-white p-8 rounded-2xl shadow-lg w-96">

          <h2 className="text-2xl font-bold mb-2 text-center">
            Create Account
          </h2>

          <p className="text-gray-500 text-sm mb-6 text-center">
            Start your AI-powered loan analysis journey
          </p>

          <input
            name="name"
            placeholder="Full Name"
            className="w-full mb-3 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full mb-3 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full mb-3 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
          />

          <button
            onClick={handleRegister}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition duration-200"
          >
            Create Account
          </button>

          <div className="my-4 text-center text-gray-400 text-sm">
            OR
          </div>

          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-blue-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;