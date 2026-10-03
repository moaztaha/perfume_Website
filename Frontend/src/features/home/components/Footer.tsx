import type { FooterLinks } from "@/features/home/data/home-sections.data";

function InstagramIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="12" height="12" rx="3" />
      <circle cx="8" cy="8" r="2.5" />
      <path d="M12.5 5.5h.01" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 4L4 12M4 4l8 8" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2h-2a4 4 0 0 0-4 4v2H4v3h2v5h3v-5h2l1-3H9V6a1 1 0 0 1 1-1h2V2z" />
    </svg>
  );
}

type FooterProps = {
  links: FooterLinks;
};

export function Footer({ links }: FooterProps) {
  return (
    <footer className="bg-[#1a1a1a] px-4 pb-10 pt-20 text-white sm:px-6 lg:px-20">
      <div className="mb-16 flex flex-col justify-between gap-12 lg:flex-row">
        {/* Brand story */}
        <div className="flex flex-col gap-6 lg:w-[400px]">
          <h2 className="font-[family-name:var(--font-instrument-serif)] text-[40px] tracking-[0.14em]">
            O D O R A T U S
          </h2>
          <p className="text-[14px] leading-relaxed text-[#f2ede4]/80">
            An independent olfactory house cultivating slow-luxury liquid
            narratives. Every bottle is hand-poured in small batches using
            sustainably sourced botanicals.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              aria-label="Instagram"
              className="flex size-8 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20 cursor-pointer"
            >
              <InstagramIcon />
            </a>
            <a
              href="#"
              aria-label="X (Twitter)"
              className="flex size-8 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20 cursor-pointer"
            >
              <XIcon />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="flex size-8 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20 cursor-pointer"
            >
              <FacebookIcon />
            </a>
          </div>
        </div>

        {/* Footer links */}
        <div className="flex flex-wrap gap-12 lg:gap-20">
          <div className="flex flex-col gap-5">
            <h3 className="text-[12px] font-bold uppercase text-[#c5a880]">
              Collections
            </h3>
            {links.collections.map((link) => (
              <a
                key={link}
                href="#"
                className="text-[13px] text-white/70 transition-colors hover:text-white cursor-pointer"
              >
                {link}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-5">
            <h3 className="text-[12px] font-bold uppercase text-[#c5a880]">
              Customer Care
            </h3>
            {links.customerCare.map((link) => (
              <a
                key={link}
                href="#"
                className="text-[13px] text-white/70 transition-colors hover:text-white cursor-pointer"
              >
                {link}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-5">
            <h3 className="text-[12px] font-bold uppercase text-[#c5a880]">
              About Us
            </h3>
            {links.aboutUs.map((link) => (
              <a
                key={link}
                href="#"
                className="text-[13px] text-white/70 transition-colors hover:text-white cursor-pointer"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer legal */}
      <div className="flex flex-col gap-6">
        <div className="h-px w-full bg-white/13" />
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-[12px] text-white/50">
            © 2026 Odoratus. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase text-white/40">
            <span>Secured checkout via</span>
            <span className="rounded border border-white/13 px-2 py-1 text-[9px] font-semibold text-white/60">
              VISA
            </span>
            <span className="rounded border border-white/13 px-2 py-1 text-[9px] font-semibold text-white/60">
              MASTERCARD
            </span>
            <span className="rounded border border-white/13 px-2 py-1 text-[9px] font-semibold text-white/60">
              AMEX
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
