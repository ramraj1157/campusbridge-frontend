import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, Loader } from "lucide-react";

import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Input from "../components/Input.jsx";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter.jsx";
import { register } from "../apis/userApi.js"; 
import { sendOtp } from "../apis/otpApi.js";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault(); // <-- Prevents form refresh, must come first!

    if (!email || !name || !password) {
      toast.error("Please enter all fields !");
      return;
    }

    try {
      setLoading(true);

      // Store data before redirect
      sessionStorage.setItem(
        "registerData",
        JSON.stringify({ name, email, password })
      );

      const response = await sendOtp({ email, useCase: "register" });

      if (response.success) {
        toast.success(
          "An OTP has been sent to your email. Please verify your email."
        );
        navigate("/verify-email");
      }
    } catch (error) {
      toast.error(error.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-green-100">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }} // Smooth fade-in and slide-up effect
        className="w-full max-w-md p-8 text-white bg-gray-900 shadow-2xl rounded-2xl"
      >
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center">Create Account</h2>

        {/* Form */}
        <form onSubmit={handleSignUp} className="mt-6 space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Input
              icon={User}
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Input
              icon={Mail}
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Input
              icon={Lock}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <PasswordStrengthMeter password={password} />
          </motion.div>

          {/* Sign Up Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="w-full py-3 cursor-pointer font-bold bg-purple-500 rounded-xl hover:bg-purple-600 focus:outline-none"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <Loader className="mx-auto animate-spin" size={24} />
            ) : (
              "Sign Up"
            )}
          </motion.button>
        </form>

        {/* Login & Forgot Password Links */}
        <div className="mt-4 text-center">
          <p>
            Already have an account?{" "}
            <span
              className="text-blue-400 cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              Login here
            </span>
          </p>
        </div>

        <div className="mt-2 text-center">
          <p>
            <span
              className="text-blue-400 cursor-pointer hover:underline"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot your password?
            </span>
          </p>
        </div>

        {/* New Link to Go to Home */}
        <div className="mt-2 text-center">
          <p>
            <span
              className="text-blue-400 cursor-pointer hover:underline"
              onClick={() => navigate("/")}
            >
              Go to Home Page
            </span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUpPage;
