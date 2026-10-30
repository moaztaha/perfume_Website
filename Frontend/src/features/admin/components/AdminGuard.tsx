"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { verifyTokenService } from "@/features/auth/services/auth.service";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, token, isAuthenticated, isLoading, hasHydrated, login, logout } = useAuthStore();
  const [verifiedSession, setVerifiedSession] = useState<{
    token: string | null;
    pathname: string;
  } | null>(null);

  const isLoginPage = pathname === "/admin/login";
  const isSessionReady = verifiedSession?.token === token && verifiedSession.pathname === pathname;
  const isCheckingSession = !hasHydrated || isLoading || !isSessionReady;
  const isAdmin = isSessionReady && isAuthenticated && user?.role === "admin";

  useEffect(() => {
    if (!hasHydrated) return;
    let active = true;
    setVerifiedSession(null);

    if (!token) {
      logout();
      setVerifiedSession({ token: null, pathname });
      return () => { active = false; };
    }

    verifyTokenService(token)
      .then((verifiedUser) => {
        if (active) login(verifiedUser, token);
      })
      .catch(() => {
        if (active) logout();
      })
      .finally(() => {
        if (active) {
          setVerifiedSession({ token, pathname });
        }
      });

    return () => { active = false; };
  }, [hasHydrated, token, pathname, login, logout]);

  useEffect(() => {
    if (!hasHydrated || !isSessionReady || isLoading) return;
    if (isLoginPage && isAdmin) router.replace("/admin");
    if (!isLoginPage && !isAdmin) router.replace("/admin/login");
  }, [hasHydrated, isSessionReady, isLoading, isLoginPage, isAdmin, router]);

  
  if (isLoginPage) {
    if (isCheckingSession || isAdmin) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-[#faf8f5]">
          <div className="text-[14px] text-[#8a837a]">{isAdmin ? "Redirecting to dashboard..." : "Checking session..."}</div>
        </div>
      );
    }
    return <>{children}</>;
  }

  // Protected admin routes
  if (isCheckingSession) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#faf8f5]">
        <div className="flex flex-col items-center gap-3">
          <div className="size-6 animate-spin rounded-full border-2 border-[#1a1a1a] border-t-transparent" />
          <div className="text-[14px] text-[#8a837a]">Verifying authorization...</div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#faf8f5]">
        <div className="text-[14px] text-[#8a837a]">Redirecting to login...</div>
      </div>
    );
  }

  return <>{children}</>;
}
