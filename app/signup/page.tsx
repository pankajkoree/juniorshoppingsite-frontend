"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";

const Signup = () => {
  const router = useRouter();
  const { register, isLoading } = useAuth();
  const [users, setUsers] = useState({
    username: "",
    email: "",
    password: "",
  });

  // <-------- registration ------->
  const handleRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await register(users.username, users.email, users.password);
      toast.success("Account created successfully");
      router.push("/login");
    } catch (error) {
      toast.error("Unable to register. Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen flex justify-center items-center bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-[#030f16] py-20">
      <div className="relative flex flex-col justify-center items-center xl:w-[28%] w-full mx-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 p-8">
        {/* <------- heading and sub headings -------> */}
        <div className="flex flex-col justify-center items-center gap-3 py-6 w-full text-center">
          <div className="w-12 h-12 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mb-2">
            <span className="text-white text-xl font-bold">+</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Get Started</h1>
          <p className="text-gray-600 dark:text-gray-400 text-base">Create your account to begin shopping</p>
        </div>

        {/* <------- signup form -------> */}
        <form className="flex flex-col gap-6 w-full" onSubmit={handleRegistration}>
          {/* <------- username -------> */}
          <div className="flex flex-col gap-3">
            <Label htmlFor="username" className="text-sm font-semibold text-gray-700 dark:text-gray-300">Username</Label>
            <Input
              type="text"
              id="username"
              name="username"
              value={users.username}
              placeholder="choose your username"
              onChange={(e) =>
                setUsers({
                  ...users,
                  username: e.target.value,
                })
              }
              className="px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:focus:border-emerald-400 dark:focus:ring-emerald-900 transition-all outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700"
            />
          </div>
          
          {/* <------- email -------> */}
          <div className="flex flex-col gap-3">
            <Label htmlFor="email" className="text-sm font-semibold text-gray-700 dark:text-gray-300">Email Address</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={users.email}
              placeholder="you@example.com"
              onChange={(e) =>
                setUsers({
                  ...users,
                  email: e.target.value,
                })
              }
              className="px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:focus:border-emerald-400 dark:focus:ring-emerald-900 transition-all outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700"
            />
          </div>

          {/* <------- password -------> */}
          <div className="flex flex-col gap-3">
            <Label htmlFor="password" className="text-sm font-semibold text-gray-700 dark:text-gray-300">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              value={users.password}
              placeholder="••••••••"
              onChange={(e) =>
                setUsers({
                  ...users,
                  password: e.target.value,
                })
              }
              className="px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:focus:border-emerald-400 dark:focus:ring-emerald-900 transition-all outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700"
            />
          </div>
          
          {/* <------- signup button and login indicator -------> */}
          <div className="flex flex-col justify-center items-center gap-4 pt-2">
            {/* <------- signup button -------> */}
            <Button 
              variant="login" 
              size="lg"
              disabled={isLoading}
              className="w-full text-white font-semibold bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 dark:from-emerald-600 dark:to-emerald-700 dark:hover:from-emerald-700 dark:hover:to-emerald-800 shadow-md hover:shadow-lg border-0 disabled:opacity-50"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>

            {/* <------- what if user already have account -------> */}
            <section className="text-sm text-gray-600 dark:text-gray-400 text-center">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors">
                Sign in
              </Link>
            </section>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
