"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/auth.store";


export function useRequireAuth() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuthStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const isAdmin = isAuthenticated && user?.role === "admin";

  useEffect(() => {
    if (isHydrated && !isLoading) {
      if (!isAuthenticated || user?.role !== "admin") {
        router.replace("/admin/login");
      }
    }
  }, [isHydrated, isAuthenticated, isLoading, user, router]);

  return {
    isAuthenticated: isAdmin,
    isLoading: !isHydrated || isLoading,
    user,
  };
}
