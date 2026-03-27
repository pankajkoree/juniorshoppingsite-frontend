"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Login = () => {
  const router = useRouter();
  const [users, setUsers] = useState({
    username: "",
    email: "",
    password: "",
  });

  // <-------- registration ------->
  const handleRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const registerResponse = await axios.post(
        "https://juniorshoppingsite-backend.onrender.com/api/user/register",
        users,
      );
      toast.success("account created");
      router.push("/login");
    } catch (error) {
      toast.error("unable to register");
    }
  };

  return (
    <div className="relative min-h-screen flex justify-center items-center bg-linear-to-br from-gray-50 to-gray-100 py-20">
      <div className="relative flex flex-col justify-center items-center xl:w-[28%] w-full mx-4 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 p-8">
        {/* <------- heading and sub headings -------> */}
        <div className="flex flex-col justify-center items-center gap-3 py-6 w-full text-center">
          <div className="w-12 h-12 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mb-2">
            <span className="text-white text-xl font-bold">+</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900">Get Started</h1>
          <p className="text-gray-600 text-base">Create your account to begin shopping</p>
        </div>

        {/* <------- signup form -------> */}
        <form className="flex flex-col gap-6 w-full" onSubmit={handleRegistration}>
          {/* <------- username -------> */}
          <div className="flex flex-col gap-3">
            <Label htmlFor="username" className="text-sm font-semibold text-gray-700">Username</Label>
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
              className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none text-gray-900 placeholder-gray-400"
            />
          </div>
          
          {/* <------- email -------> */}
          <div className="flex flex-col gap-3">
            <Label htmlFor="email" className="text-sm font-semibold text-gray-700">Email Address</Label>
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
              className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none text-gray-900 placeholder-gray-400"
            />
          </div>

          {/* <------- password -------> */}
          <div className="flex flex-col gap-3">
            <Label htmlFor="password" className="text-sm font-semibold text-gray-700">Password</Label>
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
              className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none text-gray-900 placeholder-gray-400"
            />
          </div>
          
          {/* <------- signup button and login indicator -------> */}
          <div className="flex flex-col justify-center items-center gap-4 pt-2">
            {/* <------- signup button -------> */}
            <Button 
              variant="login" 
              size="lg"
              className="w-full text-white font-semibold bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-md hover:shadow-lg border-0"
            >
              Create Account
            </Button>

            {/* <------- what if user already have account -------> */}
            <section className="text-sm text-gray-600 text-center">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
                Sign in
              </Link>
            </section>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
