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

      setSuccessMsg("Signup successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "An unexpected error occurred during signup.";
      setErrorMsg(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4">
      <div className="w-full max-w-5xl bg-[#111] rounded-lg shadow-lg flex flex-col md:flex-row overflow-hidden">
        {/* Left - Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <h2 className="text-3xl font-bold text-white text-center mb-2">
            Create your account
          </h2>
          <p className="text-sm text-gray-400 text-center mb-6">
            Start your journey with Syncly
          </p>

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
            <div>
              <label htmlFor="name" className="block text-white mb-1">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-white mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-white mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition disabled:opacity-50"
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
            src="/public/login_page.png"
            alt="Syncly Illustration"
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.3] dark:grayscale"
          />
        </div>
      </div>

      <div className="absolute bottom-8 w-full text-center text-xs text-gray-500">
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
