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
      setErrorMsg(
        error?.response?.data?.message || "Unexpected error during signup."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full h-full max-w-5xl flex flex-col md:flex-row-reverse rounded-lg overflow-hidden shadow-lg bg-[#111]">
        {/* Right - Image */}
        <div className="relative hidden md:block w-1/2 h-full bg-black">
          <img
            src="/logo_page.png"
            alt="Signup Visual"
            className="h-full w-full object-contain p-10 dark:brightness-[0.6]"
          />
        </div>

        {/* Left - Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-2">Create an Account</h2>
          <p className="text-gray-400 mb-6 text-sm">Sign up to join Syncly</p>

          {errorMsg && (
            <p className="text-red-500 text-sm text-center mb-3">{errorMsg}</p>
          )}
          {successMsg && (
            <p className="text-green-400 text-sm text-center mb-3">
              {successMsg}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full p-3 rounded bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full p-3 rounded bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-black py-2 rounded-md font-semibold hover:bg-gray-200 transition disabled:opacity-50"
            >
              {isLoading ? "Signing up..." : "Sign up"}
            </button>
          </form>

          <p className="text-sm text-center pt-4 text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-white font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>

      <div className="absolute bottom-4 w-full text-center text-xs text-gray-500">
        By signing up, you agree to our{" "}
        <a href="#" className="underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="underline">
          Privacy Policy
        </a>
        .
      </div>
    </div>
  );
};

export default Signup;
