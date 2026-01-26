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
    <div className="relative flex justify-center items-center py-32">
      <div className="relative flex flex-col justify-center items-center xl:w-[22%] border shadow-sm shadow-gray-300 hover:shadow-blue-300 rounded-sm p-4">
        {/* <------- heading and sub headings -------> */}
        <div className="flex flex-col justify-center items-center gap-2 py-8">
          <h1 className="xl:text-4xl">Signup</h1>
          <h2 className="xl:text-2xl">Register your account</h2>
        </div>

        {/* <------- login form -------> */}
        <form className="flex flex-col gap-4" onSubmit={handleRegistration}>
          {/* <------- username -------> */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              id="username"
              name="username"
              value={users.username}
              placeholder="username"
              onChange={(e) =>
                setUsers({
                  ...users,
                  username: e.target.value,
                })
              }
            />
          </div>
          {/* <------- email -------> */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={users.email}
              placeholder="abc@example.com"
              onChange={(e) =>
                setUsers({
                  ...users,
                  email: e.target.value,
                })
              }
              className="w-90"
            />
          </div>

          {/* <------- password -------> */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              value={users.password}
              placeholder="password"
              onChange={(e) =>
                setUsers({
                  ...users,
                  password: e.target.value,
                })
              }
            />
          </div>
          {/* <------- signup button and login indicator -------> */}
          <div className="flex flex-col justify-center items-center gap-2">
            {/* <------- signup button -------> */}
            <Button variant="login" size="lg">
              Register
            </Button>

            {/* <------- what if user already have account -------> */}
            <section className="text-sm text-gray-600">
              Already have an account ?{" "}
              <Link href="/login" className="underline text-blue-400">
                Login
              </Link>
            </section>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
