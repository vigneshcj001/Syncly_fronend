import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        "An unexpected error occurred during login.";
      setErrorMsg(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full h-full max-w-5xl flex flex-col md:flex-row rounded-lg overflow-hidden shadow-lg bg-[#111]">
        <div className="relative hidden md:block w-1/2 h-full bg-black">
          <img
            src="/login_page.png"
            alt="Syncly Logo"
            className="h-full w-full object-contain p-10 dark:brightness-[0.6]"
          />
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-12">
          <h1 className="text-3xl font-bold mb-2">Welcome Back!</h1>
          <p className="text-gray-400 mb-6 text-sm">
            Login to your Syncly account
          </p>

          {errorMsg && (
            <div className="bg-red-500/20 text-red-400 p-2 rounded text-sm mb-4 text-center">
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

          <p className="text-center text-sm pt-4 text-gray-400">
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
    </div>
  );
};

export default Login;
