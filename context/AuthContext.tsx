import { api } from "@/lib/api/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

  refetchUser: () => void;
}

// <------- auth context ------->
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// <------- Auth provider ------->
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();

  // <------- refetch user ------->
  const refetchUser = () =>
    queryClient.invalidateQueries({ queryKey: ["currentUser"] });

  // <------- current user ------->
  const { data: user } = useQuery<User | null>({
    queryKey: ["currentUser"],
    queryFn: async () => {
      try {
        const res = await api.get("/", {
          withCredentials: true,
        });
        if (res.data) {
          return res.data;
        }
        return null;
      } catch (error) {
        return null;
      }
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  // <------- login mutation ------->
  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: { email: string; password: string }) => {
      try {
        const res = await api.post("/login", data, { withCredentials: true });
        return res.data;
      } catch (error: any) {
        throw new Error(error.response?.data?.message || "login failed");
      }
    },
  });

  // <------- login ------->
  const login = async (email: string, password: string) => {
    await loginMutation.mutateAsync({ email, password });
  };

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,

        refetchUser,
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
