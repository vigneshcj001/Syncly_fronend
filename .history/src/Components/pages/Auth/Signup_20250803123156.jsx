import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../../../utils/api";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsLoading(true);
    try {
      await api.post("/auth/signup", {
        userName: form.name,
        emailID: form.email,
        password: form.password,
      });
      setSuccessMsg("Signup successful! Redirecting...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      setErrorMsg(error?.response?.data?.message || "Unexpected signup error.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center px-4 text-white">
      <div className="w-full max-w-6xl bg-[#111] rounded-lg overflow-hidden shadow-md flex flex-col md:flex-row-reverse">
        {/* Image Right */}
        <div className="w-full md:w-1/2 bg-black flex items-center justify-center">
          <img
            src="/logo_page.png"
            alt="Signup Visual"
            className="w-full h-full object-contain p-10"
          />
        </div>

        {/* Form Left */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-2">Create Account</h2>
          <p className="text-sm text-gray-400 mb-6">
            Join Syncly and start connecting!
          </p>

          {errorMsg && <p className="text-red-500 text-sm mb-3">{errorMsg}</p>}
          {successMsg && (
            <p className="text-green-400 text-sm mb-3">{successMsg}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              required
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded"
            />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 bg-white text-black rounded hover:bg-gray-200 transition disabled:opacity-50"
            >
              {isLoading ? "Signing up..." : "Sign up"}
            </button>
          </form>

          <p className="text-sm text-gray-400 text-center pt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-white font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
