"use client";

import { useAuthStore } from "../store/auth.store";
import { loginService, logoutService } from "../services/auth.service";
import type { LoginCredentials } from "../types/auth.types";

export function useAuth() {
  const { user, token, isAuthenticated, isLoading, login, logout, setLoading } =
    useAuthStore();

  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      setLoading(true);
      const response = await loginService(credentials);
      login(response.user, response.token);
      return { success: true };
    } catch (error) {
      setLoading(false);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Login failed",
      };
    }
  };

  const handleLogout = async () => {
    try {
      await logoutService();
    } finally {
      logout();
    }
  };

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    login: handleLogin,
    logout: handleLogout,
  };
}
