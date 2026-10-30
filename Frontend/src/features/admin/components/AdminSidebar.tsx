"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/features/auth/hooks/useAuth";

type NavItem = {
  icon: React.ReactNode;
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 10.5V16.5C3 16.7761 3.22386 17 3.5 17H7.5C7.77614 17 8 16.7761 8 16.5V12.5C8 12.2239 8.22386 12 8.5 12H11.5C11.7761 12 12 12.2239 12 12.5V16.5C12 16.7761 12.2239 17 12.5 17H16.5C16.7761 17 17 16.7761 17 16.5V10.5M1 10L10 3L19 10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    label: "Dashboard",
    href: "/admin",
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 3C10 3 7 5.5 7 8.5C7 10.433 8.567 12 10.5 12C12.433 12 14 10.433 14 8.5C14 5.5 11 3 11 3M6 16C6 16 4 14 4 12C4 10.343 5.343 9 7 9C8.657 9 10 10.343 10 12C10 14 8 16 8 16M14 16C14 16 12 14 12 12C12 10.343 13.343 9 15 9C16.657 9 18 10.343 18 12C18 14 16 16 16 16"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    label: "Products",
    href: "/admin/products",
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    router.push("/");
  };

  return (
    <aside className="grid w-full grid-cols-[minmax(0,1fr)_auto] grid-rows-[auto_auto] bg-[#1a1a1a] text-white lg:fixed lg:left-0 lg:top-0 lg:flex lg:h-screen lg:w-[235px] lg:flex-col">
      {/* Logo */}
      <div className="col-start-1 row-start-1 min-w-0 border-b border-white/10 px-3 py-3 sm:px-6 sm:py-4 lg:col-auto lg:row-auto lg:px-6 lg:pb-6 lg:pt-8">
        <Link href="/admin" className="block">
          <h1 className="whitespace-nowrap font-[family-name:var(--font-instrument-serif)] text-[17px] leading-tight sm:text-[24px] lg:text-[28px]">
           O D O R A T U S
          </h1>
          <p className="mt-1 hidden text-[10px] uppercase tracking-[0.12em] text-white/60 sm:block">
            Haute Parfumerie
          </p>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="col-span-2 row-start-2 px-3 py-2 lg:col-auto lg:row-auto lg:flex-1 lg:overflow-y-auto lg:py-6">
        <ul className="flex gap-1 lg:flex-col">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex min-w-0 items-center gap-2 rounded px-3 py-2.5 text-[12px] transition-colors sm:gap-3 sm:text-[13px] lg:px-3 ${
                  isActive(item.href)
                    ? "bg-white/10 text-white"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="flex size-5 items-center justify-center">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="col-start-2 row-start-1 border-b border-white/10 p-2 lg:col-auto lg:row-auto lg:mt-auto lg:border-t lg:border-b-0 lg:p-4">
        <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3">
          <Link href="/admin/profile" aria-label="View admin profile" className={`flex min-w-0 flex-1 items-center gap-1.5 rounded p-1 transition-colors hover:bg-white/5 sm:gap-2 lg:gap-3 ${pathname === "/admin/profile" ? "bg-white/10" : ""}`}>
          <div className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/10 lg:size-10">
            {user?.avatar ? <img src={user.avatar} alt="" className="size-full object-cover" /> : <span className="text-[14px] font-semibold">{user?.name?.trim().split(/[\s@._-]+/).filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("") || "A"}</span>}
          </div>
          <div className="min-w-0 flex-1 overflow-hidden">
            <p className="max-w-[76px] truncate text-[10px] font-medium sm:max-w-[100px] sm:text-[12px] lg:max-w-none lg:text-[13px]">{user?.name || user?.email || "Admin"}</p>
            <p className="max-w-[76px] truncate text-[9px] text-white/60 sm:max-w-[100px] sm:text-[10px] lg:max-w-none lg:text-[11px]">
              {user?.roleName || (user?.role === "admin" ? "Administrator" : user?.role === "manager" ? "Manager" : "")}
            </p>
          </div>
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="flex size-7 shrink-0 items-center justify-center rounded transition-colors hover:bg-white/10 lg:size-8"
            aria-label="Logout"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white/70"
            >
              <path
                d="M6 14H3C2.44772 14 2 13.5523 2 13V3C2 2.44772 2.44772 2 3 2H6M11 11L14 8M14 8L11 5M14 8H6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
}
