"use client";

import Link from "next/link";
import { LoginForm } from "@/features/auth/components/LoginForm";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#faf8f5] px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <h1 className="font-[family-name:var(--font-instrument-serif)] text-[40px] leading-tight text-[#1a1a1a]">
            O D O R A T U S
          </h1>
          <p className="mt-2 text-[12px] uppercase tracking-[0.12em] text-[#8a837a]">
            Admin Dashboard
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-lg border border-[#ebe6de] bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-[22px] font-semibold text-[#1a1a1a]">
            Sign In
          </h2>
          <LoginForm />
        </div>

        {/* Back to Store */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-[13px] text-[#605a54] transition-colors hover:text-[#1a1a1a]"
          >
            ← Back to Store
          </Link>
        </div>
      </div>
    </div>
  );
}
