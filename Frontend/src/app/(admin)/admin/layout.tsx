import type { Metadata } from "next";
import { AdminGuard } from "@/features/admin/components/AdminGuard";

export const metadata: Metadata = {
  title: "Admin Dashboard - Maison Noir",
  description: "Admin dashboard for Maison Noir perfume store",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminGuard>{children}</AdminGuard>;
}
