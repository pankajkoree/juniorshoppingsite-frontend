"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const Login = () => {
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });
  return (
    <>
      <h1>Login</h1>
      {/* <------- login form -------> */}
      <form>
        {/* <------- email -------> */}
        <div>
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
        <div>
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
      </form>
    </>
  );
};

export default Login;
