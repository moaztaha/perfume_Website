import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, AuthState } from "../types/auth.types";

type AuthStore = AuthState & {
  setUser: (user: User | null) => void;
  setLoading: (isLoading: boolean) => void;
  login: (user: User, token: string) => void;
  logout: () => void;
  setHasHydrated: (hasHydrated: boolean) => void;
};


function syncAuthToCookie(state: Partial<AuthState>) {
  if (typeof window === "undefined") return;

  try {
    const cookieValue = encodeURIComponent(
      JSON.stringify({ state })
    );
    
    const maxAge = 60 * 60 * 24 * 7; // 
    document.cookie = `auth-storage=${cookieValue}; path=/; max-age=${maxAge}; SameSite=Lax`;
  } catch (error) {
    console.error("Failed to sync auth to cookie:", error);
  }
}

/**
 * Clear auth cookie
 */
function clearAuthCookie() {
  if (typeof window === "undefined") return;
  
  document.cookie = "auth-storage=; path=/; max-age=0";
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      hasHydrated: false,
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
      setUser: (user) => {
        const newState = { user, isAuthenticated: user !== null };
        set(newState);
        syncAuthToCookie(newState);
      },
      setLoading: (isLoading) => set({ isLoading }),
      login: (user, token) => {
        const newState = { user, token, isAuthenticated: true, isLoading: false };
        set(newState);
        syncAuthToCookie({ user, token, isAuthenticated: true });
      },
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false, isLoading: false });
        clearAuthCookie();
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: (state) => (rehydratedState) => {
        const hydrated = rehydratedState ?? state;
        if (hydrated) {
          syncAuthToCookie({
            user: hydrated.user,
            token: hydrated.token,
            isAuthenticated: hydrated.isAuthenticated,
          });
          hydrated.setHasHydrated(true);
        } else {
          state?.setHasHydrated(true);
        }
      },
    }
  )
);
