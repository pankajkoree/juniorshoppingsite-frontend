"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { FaGoogle, FaFacebookF } from "react-icons/fa";

const messageToString = (value: unknown): string | undefined => {
  if (typeof value === "string" && value.trim() !== "") return value;
  if (typeof value === "number") return value.toString();
  return undefined;
};

const Login = () => {
  const router = useRouter();
  const { login, isAuthenticated, user, isLoading } = useAuth();
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });

  // <------- login function ------->
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!loginCredentials.email.trim() || !loginCredentials.password.trim()) {
      toast.error("Please enter both email and password.");
      return;
    }

    try {
      await login(loginCredentials.email, loginCredentials.password);
      clearCredentials();
    } catch (error: unknown) {
      let msg: string | undefined;
      if (axios.isAxiosError(error)) {
        msg = (error.response?.data as { message?: string })?.message || error.message;
      }
      toast.error(messageToString(msg) || "Invalid credentials");
      console.error("Login error:", error);
    }
  };
  useEffect(() => {
    if (isAuthenticated && user) {
      toast.success("login successful");
      router.push("/");
    }
  }, [isAuthenticated, user, router]);

  const clearCredentials = () => {
    setLoginCredentials({ email: "", password: "" });
  };

  return (
    <div className="relative min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-[#030f16] py-20">
      <div className="relative flex flex-col justify-center items-center xl:w-[28%] w-full mx-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 p-8">
        {/* <------- heading and sub headings -------> */}
        <div className="flex flex-col justify-center items-center gap-3 py-6 w-full text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-2">
            <span className="text-white text-xl font-bold">→</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Welcome Back</h1>
          <p className="text-gray-600 dark:text-gray-400 text-base">Sign in to your account to continue</p>
        </div>

        {/* <------- login form -------> */}
        <form className="flex flex-col gap-6 w-full" onSubmit={handleLogin}>
          {/* <------- email -------> */}
          <div className="flex flex-col gap-3">
            <Label htmlFor="email" className="text-sm font-semibold text-gray-700 dark:text-gray-300">Email Address</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={loginCredentials.email}
              placeholder="you@example.com"
              onChange={(e) =>
                setLoginCredentials({
                  ...loginCredentials,
                  email: e.target.value,
                })
              }
              className="px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:border-blue-400 dark:focus:ring-blue-900 transition-all outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700"
            />
          </div>

          {/* <------- password -------> */}
          <div className="flex flex-col gap-3">
            <Label htmlFor="password" className="text-sm font-semibold text-gray-700 dark:text-gray-300">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              value={loginCredentials.password}
              placeholder="••••••••"
              onChange={(e) =>
                setLoginCredentials({
                  ...loginCredentials,
                  password: e.target.value,
                })
              }
              className="px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:border-blue-400 dark:focus:ring-blue-900 transition-all outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700"
            />
          </div>
          
          {/* <------- login button and signup indicator -------> */}
          <div className="flex flex-col justify-center items-center gap-4 pt-2">
            {/* <------- login button -------> */}
            <Button 
              variant="login" 
              size="lg"
              className="w-full text-white font-semibold bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 dark:from-blue-600 dark:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 shadow-md hover:shadow-lg border-0"
            >
              {isLoading ? "Logging in..." : "Sign In"}
            </Button>

            <div className="w-full border-t border-gray-200 dark:border-gray-700 pt-4">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 text-center mb-3">Or continue with</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => toast('Google login coming soon', { icon: '🔎' })}
                  className="flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm font-medium"
                >
                  <FaGoogle className="w-4 h-4 text-red-500" />
                  Continue with Google
                </button>
                <button
                  type="button"
                  onClick={() => toast('Facebook login coming soon', { icon: '🔎' })}
                  className="flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm font-medium"
                >
                  <FaFacebookF className="w-4 h-4 text-blue-600" />
                  Continue with Facebook
                </button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">
                New to JSS? <Link href="/signup" className="text-blue-600 dark:text-blue-300 font-semibold hover:text-blue-700 dark:hover:text-blue-200">Create an account</Link> to get personalized deals and fast checkout.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
