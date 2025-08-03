import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
    <div className="flex min-h-screen items-center justify-center bg-black px-4 text-white">
      <div className="w-full max-w-5xl bg-[#111] rounded-lg shadow-lg flex flex-col md:flex-row overflow-hidden">
        {/* Left - Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-2">Create your account</h2>
          <p className="text-sm text-gray-400 mb-6">Start using Syncly</p>

          {errorMsg && (
            <div className="mb-4 text-red-400 text-sm text-center bg-red-500/20 px-3 py-2 rounded">
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="mb-4 text-green-400 text-sm text-center bg-green-500/20 px-3 py-2 rounded">
              {successMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
            >
              {isLoading ? "Signing up..." : "Sign up"}
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-white font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </div>

        {/* Right - Image */}
        <div className="relative hidden md:block w-1/2 bg-black">
          <img
            src="/login_page.png"
            alt="Signup Illustration"
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.3] dark:grayscale"
          />
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
