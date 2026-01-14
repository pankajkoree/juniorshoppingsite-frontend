"use client";

import { api } from "@/lib/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext } from "react";

// <------- interface for user ------->
interface User {
  id: string;
  username: string;
  email: string;
}

// <------- interface for auth context type ------->
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// <------- auth context ------->
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// <------- Auth provider ------->
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();

  // <------- login mutation ------->
  const { mutateAsync: loginMutate, isPending: isLoginLoading } = useMutation<
    { user: User },
    Error,
    { email: string; password: string }
  >({
    mutationKey: ["login"],
    mutationFn: async (data) => {
      const res = await api.post("/api/user/login", data, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: (data) => {
      // ✅ store user in cache
      queryClient.setQueryData(["currentUser"], data.user);
    },
  });

  // <------- login function ------->

  const login = async (email: string, password: string) => {
    await loginMutate({ email, password });
  };

  // <------- logout mutation ------->
  const { mutateAsync: logoutMutate, isPending: isLogoutLoading } = useMutation<
    void,
    Error
  >({
    mutationKey: ["logout"],
    mutationFn: async () => {
      await api.post("/api/user/logout", {}, { withCredentials: true });
    },
    onSuccess: () => {
      queryClient.setQueryData(["currentUser"], null);
    },
  });

  // <------- logout function ------->
  const logout = async () => {
    await logoutMutate();
  };

  // <------- get current user from React Query cache ------->
  const user = queryClient.getQueryData<User>(["currentUser"]) ?? null;

  const isAuthenticated = !!user;
  const isLoading = isLoginLoading || isLogoutLoading;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
// <------- useAuth hook ------->
export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
};
