"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "../hooks/useAuth";
import { ButtonSpinner } from "@/components/ui/ButtonSpinner";

export function LoginForm() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const result = await login({ email, password });

    if (result.success) {
      toast.success("Logged in successfully");
      router.push("/admin");
    } else {
      const errorMsg = result.error || "Login failed";
      setError(errorMsg);
      toast.error("Sign in failed", {
        description: errorMsg,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="email"
          className="block text-[13px] font-medium text-[#1a1a1a]"
        >
          Email Address
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
          className="mt-2 block w-full rounded border border-[#ebe6de] bg-white px-4 py-3 text-[14px] text-[#1a1a1a] placeholder-[#8a837a] transition-colors focus:border-[#1a1a1a] focus:outline-none disabled:bg-[#f4f0eb] disabled:cursor-not-allowed"
          placeholder="admin@maisonnoir.com"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-[13px] font-medium text-[#1a1a1a]"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
          className="mt-2 block w-full rounded border border-[#ebe6de] bg-white px-4 py-3 text-[14px] text-[#1a1a1a] placeholder-[#8a837a] transition-colors focus:border-[#1a1a1a] focus:outline-none disabled:bg-[#f4f0eb] disabled:cursor-not-allowed"
          placeholder="Enter your password"
        />
      </div>

      {error && (
        <div className="rounded border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-800">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="flex h-12 w-full items-center justify-center gap-2.5 rounded bg-[#1a1a1a] text-[12px] font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#333333] disabled:bg-[#8a837a] disabled:cursor-not-allowed cursor-pointer"
      >
        {isLoading ? (
          <>
            <ButtonSpinner />
            <span>Signing in...</span>
          </>
        ) : (
          "Sign In"
        )}
      </button>

    </form>
  );
}
