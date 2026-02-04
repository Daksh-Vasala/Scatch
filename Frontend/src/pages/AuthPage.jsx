import { useState } from "react";
import api from "../api/api.js";
import { useNavigate } from "react-router-dom";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newErrors = {};

    if (!email.trim() || !password.trim()) {
      newErrors.password = "All fields are required";
    }

    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (isLogin === false && name.trim().length < 2) {
      newErrors.name = "Please enter your name";
    }

    if (password && password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    if(isLogin){
      const res = await api.post("/users/login", { email, password });
      console.log(res);
    } else if(!isLogin){
      const res = await api.post("/users/signup", { name, email, password });
      console.log(res);
    }
    console.log({ name, email, password });
    navigate('/');
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 ">
      <div
        className="w-full max-w-md bg-white rounded-xl p-6
        shadow-[0_4px_10px_rgba(0,0,0,0.04),0_20px_40px_rgba(0,0,0,0.08)]"
      >
        {/* Logo */}
        <h1 className="text-3xl font-semibold text-blue-600 text-center mb-6">
          Scatch
        </h1>

        {/* Tabs */}
        <div className="flex mb-6 border rounded-lg overflow-hidden transition">
          <button
            onClick={() => {
              setIsLogin(true);
              setErrors({});
              setEmail("");
              setName("");
              setPassword("");
            }}
            className={`w-1/2 py-2 text-sm font-medium transition-colors duration-200 ${
              isLogin ? "bg-blue-500 text-white" : "text-gray-600"
            } `}
          >
            Login
          </button>
          <button
            onClick={() => {
              setIsLogin(false);
              setErrors({});
              setEmail("");
              setName("");
              setPassword("");
            }}
            className={`w-1/2 py-2 text-sm font-medium transition-colors duration-200 ${
              !isLogin ? "bg-blue-500 text-white" : "text-gray-600"
            } `}
          >
            Sign up
          </button>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name (Signup only) */}
          {!isLogin && (
            <div>
              <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setErrors((prev) => ({ ...prev, name: "" }));
                }}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
              />
              {errors.name && (
                <p className="text-xs ml-2 text-red-500">{errors.name}</p>
              )}
            </div>
          )}

          <input
            type="text"
            placeholder="Email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((prev) => ({ ...prev, email: "" }));
            }}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
          />
          {errors.email && (
            <p className="text-xs ml-2 text-red-500">{errors.email}</p>
          )}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((prev) => ({ ...prev, password: "" }));
            }}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
          />
          {errors.password && (
            <p className="text-xs ml-2 text-red-500">{errors.password}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white py-2 rounded-lg text-sm transition
              ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-500 hover:opacity-90"}
            `}
          >
            {loading ? "Please wait..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AuthPage;
