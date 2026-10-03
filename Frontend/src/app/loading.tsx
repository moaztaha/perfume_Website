import { HeroSection } from "@/features/home/components/HeroSection";
import { TrendingSectionSkeleton } from "@/features/home/components/TrendingSectionSkeleton";
import { ScentArchetypesSectionSkeleton } from "@/features/home/components/ScentArchetypesSectionSkeleton";
import { OccasionsSection } from "@/features/home/components/OccasionsSection";
import { PromoBanner } from "@/features/home/components/PromoBanner";
import { NewsletterSection } from "@/features/home/components/NewsletterSection";
import { Footer } from "@/features/home/components/Footer";
import { occasions, footerLinks } from "@/features/home/data/home-sections.data";

export default function HomeLoading() {
  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <HeroSection />
      <TrendingSectionSkeleton />
      <ScentArchetypesSectionSkeleton />
      <OccasionsSection occasions={occasions} />
      <PromoBanner />
      <NewsletterSection />
      <Footer links={footerLinks} />
    </div>
  );
}
