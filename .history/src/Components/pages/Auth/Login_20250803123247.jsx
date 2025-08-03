import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../../../utils/api";

const Login = () => {
  const [emailID, setEmailID] = useState("vigneshwaran@gmail.com");
  const [password, setPassword] = useState("jVIG@020901");
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsLoading(true);
    try {
      const { data } = await api.post("/auth/login", { emailID, password });
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/home");
    } catch (error) {
      setErrorMsg(error?.response?.data?.message || "Login failed");
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
            alt="Login Visual"
            className="w-full h-full object-contain p-10"
          />
        </div>

        {/* Form Left */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
          <p className="text-sm text-gray-400 mb-6">
            Login to Syncly to continue
          </p>

          {errorMsg && <p className="text-red-500 text-sm mb-3">{errorMsg}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={emailID}
              onChange={(e) => setEmailID(e.target.value)}
              placeholder="Email"
              required
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 bg-white text-black rounded hover:bg-gray-200 transition disabled:opacity-50"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-sm text-gray-400 text-center pt-4">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-white font-semibold hover:underline"
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
