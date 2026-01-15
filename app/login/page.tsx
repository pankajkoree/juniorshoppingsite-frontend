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
  const { login, isAuthenticated, user } = useAuth();
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });

  console.log(isAuthenticated, user);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(loginCredentials.email, loginCredentials.password);
    } catch (error) {
      toast.error("invalid credentials");
    }
  };

  useEffect(() => {
    console.log(isAuthenticated, user);
    if (isAuthenticated && user) {
      toast.success("login successful");
      router.push("/");
    }
  }, [isAuthenticated, user]);
  return (
    <div className="relative flex justify-center items-center min-h-screen">
      <div className="relative flex flex-col justify-center items-center xl:w-[22%] border shadow-sm shadow-gray-300 hover:shadow-blue-300 rounded-sm p-4">
        {/* <------- heading and sub headings -------> */}
        <div className="flex flex-col justify-center items-center gap-2 py-8">
          <h1 className="xl:text-4xl">Login</h1>
          <h2 className="xl:text-2xl">Login to your account</h2>
        </div>

        {/* <------- login form -------> */}
        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          {/* <------- email -------> */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={loginCredentials.email}
              placeholder="abc@example.com"
              onChange={(e) =>
                setLoginCredentials({
                  ...loginCredentials,
                  email: e.target.value,
                })
              }
            />
          </div>

          {/* <------- password -------> */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              value={loginCredentials.password}
              placeholder="password"
              onChange={(e) =>
                setLoginCredentials({
                  ...loginCredentials,
                  password: e.target.value,
                })
              }
            />
          </div>
          {/* <------- login button and signup indicator -------> */}
          <div className="flex flex-col justify-center items-center">
            {/* <------- login button -------> */}
            <Button variant="login" size="lg">
              Login
            </Button>

            {/* <------- what if user haven't created account -------> */}
            <section>
              Don't have an account ? <Link href="/signup">Signup</Link>
            </section>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
