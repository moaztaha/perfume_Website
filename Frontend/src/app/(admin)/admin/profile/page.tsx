"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AdminSidebar } from "@/features/admin/components/AdminSidebar";
import { useAuth } from "@/features/auth/hooks/useAuth";

function initials(name?: string, email?: string) {
  const value = name?.trim() || email?.trim() || "";
  return value.split(/[\s@._-]+/).filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("") || "A";
}

export default function AdminProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const fields = [
    { label: "Username", value: user?.username },
    { label: "Email", value: user?.email },
    { label: "Role", value: user?.roleName || (user?.role ? user.role[0].toUpperCase() + user.role.slice(1) : undefined) },
  ].filter((field): field is { label: string; value: string } => Boolean(field.value?.trim()));

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    router.push("/");
  };

  return <div className="flex min-h-screen flex-col bg-[#faf8f5] lg:flex-row"><AdminSidebar /><main className="min-w-0 flex-1 px-4 py-5 sm:px-6 sm:py-6 lg:ml-[235px] lg:px-8 lg:py-8">
    <div><p className="text-[12px] font-medium uppercase tracking-[0.12em] text-[#b8956a]">Account</p><h1 className="mt-0.5 font-[family-name:var(--font-instrument-serif)] text-[42px] leading-tight text-[#1a1a1a]">Admin Profile</h1></div>
    <section className="mt-8 max-w-2xl rounded-lg border border-[#ebe6de] bg-white p-5 shadow-sm sm:p-8">
      <div className="flex items-center gap-5 border-b border-[#ebe6de] pb-7">
        {user?.avatar ? <img src={user.avatar} alt="Admin profile" className="size-16 rounded-full object-cover" /> : <div className="flex size-16 items-center justify-center rounded-full bg-[#1a1a1a] text-lg font-semibold text-white" aria-label="Admin initials">{initials(user?.name, user?.email)}</div>}
        <div><h2 className="font-[family-name:var(--font-instrument-serif)] text-[26px] text-[#1a1a1a]">{user?.name || user?.email || "Admin"}</h2><p className="mt-1 text-[13px] text-[#8a837a]">Authenticated administrator</p></div>
      </div>
      {fields.length > 0 && <dl className="divide-y divide-[#ebe6de]">{fields.map(({ label, value }) => <div key={label} className="grid grid-cols-[120px_1fr] gap-4 py-4"><dt className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#8a837a]">{label}</dt><dd className="break-words text-[14px] text-[#1a1a1a]">{value}</dd></div>)}</dl>}
      <button type="button" onClick={handleLogout} className="mt-6 rounded bg-[#1a1a1a] px-5 py-3 text-[13px] font-semibold text-white transition-colors hover:bg-[#333]">Log out</button>
    </section>
  </main></div>;
}
