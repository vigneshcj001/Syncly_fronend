import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../../utils/api";
import { useDispatch } from "react-redux";
import { addUser } from "../../../redux/userSlice";

const Login = () => {
  const [emailID, setEmailID] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsLoading(true);

    try {
      const res = await api.post("/auth/login", { emailID, password });
      if (res.data.success) {
        dispatch(addUser(res.data.user));
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/");
      } else {
        setErrorMsg(res.data.message || "Login failed");
      }
    } catch (err) {
      setErrorMsg(
        err?.response?.data?.message ||
          "An unexpected error occurred during login."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4 text-white">
      <div className="w-full max-w-5xl bg-[#111] rounded-lg shadow-lg flex flex-col md:flex-row overflow-hidden">
        {/* Left - Image */}
        <div className="relative hidden md:block w-1/2 bg-black">
          <img
            src="/login_page.png"
            alt="Login"
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.3] dark:grayscale"
          />
        </div>

        {/* Right - Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-2">Welcome back</h2>
          <p className="text-gray-400 text-sm mb-6">Login to your account</p>

          {errorMsg && (
            <div className="mb-4 text-red-400 text-sm text-center bg-red-500/20 px-3 py-2 rounded">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={emailID}
              onChange={(e) => setEmailID(e.target.value)}
              required
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-black font-semibold py-2 px-4 rounded-md hover:bg-gray-200 transition disabled:opacity-50"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-white font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>

      <div className="absolute bottom-4 w-full text-center text-xs text-gray-500">
        By continuing, you agree to our{" "}
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

export default Login;
