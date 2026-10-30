import { Header } from "@/components/shared/Header";
import { footerLinks } from "@/features/home/data/home-sections.data";
import { Footer } from "@/components/shared/Footer";


type StorefrontLayoutProps = {
  children: React.ReactNode;
};

export function StorefrontLayout({ children }: StorefrontLayoutProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer links={footerLinks} />
    </>
  );
}
