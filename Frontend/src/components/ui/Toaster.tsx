"use client";

import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster
      position="bottom-center"
      expand={false}
      richColors={false}
      closeButton
      duration={3000}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "group flex items-center justify-center gap-3 w-full max-w-md p-4 rounded-lg border border-[#ebe6de] bg-white shadow-[0_8px_24px_rgba(26,26,26,0.12)] font-sans",
          title: "text-[13px] font-semibold text-[#1a1a1a] leading-tight",
          description: "text-[12px] text-[#605a54] leading-relaxed mt-1",
          actionButton:
            "bg-[#1a1a1a] text-white px-3 py-1.5 rounded text-[11px] font-semibold uppercase tracking-wide transition-colors hover:bg-[#333333] cursor-pointer",
          cancelButton:
            "bg-[#f4f0eb] text-[#1a1a1a] px-3 py-1.5 rounded text-[11px] font-semibold uppercase tracking-wide transition-colors hover:bg-[#ebe6de] cursor-pointer",
          closeButton:
            "!bg-transparent !border-0 !text-[#605a54] hover:!text-[#1a1a1a] transition-colors cursor-pointer !left-auto !right-2 !top-2 !transform-none",
          success:
            "!border-[#c5a880] bg-gradient-to-br from-white to-[#faf8f5]",
          error: "!border-[#d4736a] bg-gradient-to-br from-white to-[#fef8f7]",
          warning:
            "!border-[#e8b84d] bg-gradient-to-br from-white to-[#fffcf5]",
          info: "!border-[#6b9bd4] bg-gradient-to-br from-white to-[#f7fafc]",
          icon: "hidden",
        },
      }}
    />
  );
}
