"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";

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
    try {
      await login(loginCredentials.email, loginCredentials.password);
      clearCredentials();
    } catch (error) {
      toast.error("invalid credentials");
    }
  };
  useEffect(() => {
    if (isAuthenticated && user) {
      toast.success("login successful");
      router.push(`/profile/${user.username}+${user.id}`);
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

            {/* <------- what if user haven't created account -------> */}
            <section className="text-sm text-gray-600 dark:text-gray-400 text-center">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                Create one
              </Link>
            </section>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
