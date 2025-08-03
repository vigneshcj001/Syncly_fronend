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
      setErrorMsg(
        error?.response?.data?.message ||
          "An unexpected error occurred during login."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form onSubmit={handleSubmit} className="space-y-4 w-80">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        {errorMsg && (
          <p className="text-red-500 text-sm text-center">{errorMsg}</p>
        )}
        <input
          type="email"
          placeholder="Email"
          value={emailID}
          onChange={(e) => setEmailID(e.target.value)}
          required
          className="w-full p-3 rounded bg-gray-800 border border-gray-600"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 rounded bg-gray-800 border border-gray-600"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-white text-black py-2 rounded hover:bg-gray-200 disabled:opacity-50"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
        <p className="text-sm text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
