"use client";

import { api } from "@/lib/api/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext } from "react";

// <------- interface for user ------->
interface User {
  id: string;
  username: string;
  email: string;
}

// <------- login response from backend ------->
interface LoginResponse {
  message: string;
  generatedToken: string;
  data: User;
}

// <------- auth context type ------->
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

  // <------- current user ------->
  const { data: user, isLoading: isUserLoading } = useQuery<User | null>({
    queryKey: ["currentUser"],
    queryFn: async () => {
      try {
        const res = await api.get("/api/user/profile", {
          withCredentials: true,
        });
        return res.data?.user ?? null;
      } catch {
        return null;
      }
    },
    initialData: null,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  // <------- login mutation ------->
  const { mutateAsync: loginMutate, isPending: isLoginLoading } = useMutation<
    LoginResponse,
    Error,
    { email: string; password: string }
  >({
    mutationKey: ["login"],
    mutationFn: async (credentials) => {
      const res = await api.post("/api/user/login", credentials, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["currentUser"],
      });
    },
  });

  // <------- login ------->
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

  // <------- logout ------->
  const logout = async () => {
    await logoutMutate();
  };

  const isAuthenticated = !!user;
  const isLoading = isUserLoading || isLoginLoading || isLogoutLoading;

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
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
};
