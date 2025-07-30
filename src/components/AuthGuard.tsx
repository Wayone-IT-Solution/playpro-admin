"use client";

import Loader from "./common/Loader";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter, usePathname } from "next/navigation";

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);

    const localToken = localStorage.getItem("adminToken");

    if (!token && !localToken) {
      router.replace("/auth/login");
    } else if (token && pathname === "/") {
      router.replace("/dashboard");
    }
  }, [token, router, pathname]);

  if (!hasMounted) return <Loader />;

  return <>{token ? children : <Loader />}</>;
};

export default AuthGuard;
