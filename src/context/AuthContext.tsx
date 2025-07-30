"use client";

import React, {
  useMemo,
  useState,
  ReactNode,
  useEffect,
  useContext,
  createContext,
} from "react";
import { Fetch } from "@/hooks/apiUtils";
import { useRouter } from "next/navigation";
import Loader from "@/components/common/Loader";
import useIsDarkMode from "@/hooks/useIsDarkMode";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextProps {
  user: any;
  logout: () => void;
  isDarkMode: boolean;
  token: string | null;
  login: (token: string, userData: User) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const { isDarkMode } = useIsDarkMode();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    router.prefetch("/dashboard");
  }, [router]);

  useEffect(() => {
    const sharedToken = typeof window !== "undefined"
      ? localStorage.getItem("adminToken")
      : null;

    const fetchUser = async () => {
      try {
        const response: {
          success: boolean;
          user: User;
          message: string;
        } = await Fetch("api/admin/current/user", {}, 5000, true, false);

        if (response?.success && response?.user) {
          setToken(sharedToken);
          setUser(response.user);
          router.replace("/dashboard");
        } else router.replace("/auth/login");
      } catch (error) {
        console.log("❌ Auth fetch error:", error);
        localStorage.clear();
        router.replace("/auth/login");
      } finally {
        setLoading(false);
      }
    };

    if (sharedToken) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [router]);

  const login = (authToken: string, userData: User) => {
    setToken(authToken);
    setUser(userData);
    localStorage.setItem("adminToken", authToken);
    router.replace("/dashboard");
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.clear();
    router.replace("/auth/login");
  };

  const contextValue = useMemo(
    () => ({
      user,
      token,
      login,
      logout,
      isDarkMode,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, token, isDarkMode]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {loading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
