import { StorefrontLayout } from "@/components/layouts/StorefrontLayout";

export default function StorefrontLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StorefrontLayout>{children}</StorefrontLayout>;
}
