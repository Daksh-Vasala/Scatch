import { useState } from "react";
import api from "../api/api.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import Input from "../components/Input.jsx";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const { setIsAuthenticated } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const validatorSchema = {
    nameValidator: {
      required: {
        value: true,
        message: "Name is required",
      },
      minLength: {
        value: 4,
        message: "Minimum letters should be four",
      },
    },

    emailValidator: {
      required: {
        value: true,
        message: "Email is required",
      },
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Enter a valid email",
      },
    },

    passwordValidator: {
      required: {
        value: true,
        message: "Password is required",
      },
      pattern: {
        value: /.{8,}/,
        message: "Password must be at least 8 characters",
      },
    },
  };

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submitHandler = async (data) => {
    console.log(data);
    setLoading(true);

    try {
      if (isLogin) {
        const res = await api.post("/users/login", {
          email: data.email,
          password: data.password,
        });
        toast.success("Logged in successfully", { autoClose: 1000 });
      } else if (!isLogin) {
        const res = await api.post("/users/signup", {
          name: data.name,
          email: data.email,
          password: data.password,
        });
        toast.success("Signed up successfully", { autoClose: 1000 });
      }
      setIsAuthenticated(true);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 px-4 ">
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
            }}
            className={`w-1/2 py-2 text-sm font-medium transition-colors duration-200 ${
              !isLogin ? "bg-blue-500 text-white" : "text-gray-600"
            } `}
          >
            Sign up
          </button>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit(submitHandler)}>
          {/* Name (Signup only) */}
          {!isLogin && (
            <Input
              type="text"
              placeholder={"Full name"}
              register={register}
              validator={validatorSchema.nameValidator}
              name="name"
              errors={errors}
            />
          )}

          <Input
            type="text"
            placeholder={"Email address"}
            register={register}
            validator={validatorSchema.emailValidator}
            name="email"
            errors={errors}
          />

          <Input
            type="password"
            placeholder={"Password"}
            register={register}
            validator={validatorSchema.passwordValidator}
            name="password"
            errors={errors}
          />

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
