"use client";

import Link from "next/link";
import { CartNavLink } from "@/features/cart";
import { productPaths } from "@/features/products";
import { useWishlist } from "@/features/wishlist";

function SearchIcon() {
  return <svg aria-hidden="true" viewBox="0 0 20 20" className="size-[14px]" fill="none"><circle cx="8.75" cy="8.75" r="5.75" stroke="currentColor" strokeWidth="1.4" /><path d="m13 13 4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>;
}

function AccountIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none"><circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.4" /><path d="M4.75 20c.45-3.65 3.3-5.75 7.25-5.75s6.8 2.1 7.25 5.75" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>;
}

function HeartIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
    >
      <path
        d="M12 21L10.55 19.7C5.4 15.16 2 12.08 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.08 18.6 15.16 13.45 19.7L12 21Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Header() {
  const { count } = useWishlist();

  return (
    <header className="bg-[#faf8f5] text-[#1a1a1a]">
      <div className="flex min-h-[35px] items-center justify-center bg-[#1a1a1a] px-4 py-2.5 text-center text-[10px] font-semibold uppercase tracking-[0.04em] text-white sm:text-[11px]">Complimentary signature gift wrapping on all orders above $150</div>
      <div className="relative flex min-h-[72px] items-center justify-between border-b border-[#ebe6de] px-4 sm:min-h-[90px] sm:px-6 lg:px-20">
        <nav aria-label="Main navigation" className="hidden items-center gap-10 text-[13px] font-medium uppercase text-[#605a54] lg:flex">
          <Link href="/" className="transition-colors hover:text-[#1a1a1a]">Home</Link>
          <Link href={productPaths.list} className="transition-colors hover:text-[#1a1a1a]">Shop</Link>
          <Link href="/categories" className="transition-colors hover:text-[#1a1a1a]">Categories</Link>
        </nav>
        <Link href="/" className="font-[family-name:var(--font-instrument-serif)] text-[27px] tracking-[0.14em] text-[#1a1a1a] sm:text-[38px] lg:absolute lg:left-1/2 lg:-translate-x-1/2" aria-label="Odoratus home">O D O R A T U S</Link>
        <div className="flex items-center gap-4 text-[#1a1a1a] sm:gap-7">
          <form action={productPaths.list} role="search" className="hidden h-9 w-[200px] items-center gap-2 rounded-full border border-[#ebe6de] px-3 text-[#605a54] md:flex">
            <SearchIcon />
            <input type="search" name="search" aria-label="Search fragrances" placeholder="Search fragrances..." className="min-w-0 flex-1 bg-transparent text-[12px] outline-none placeholder:text-[#605a54]" />
          </form>
          <button type="button" aria-label="Account" className="hidden transition-colors hover:text-[#c5a880] sm:inline-flex cursor-pointer"><AccountIcon /></button>
          <Link
            href="/wishlist"
            aria-label={`Wishlist (${count} items)`}
            className="relative hidden transition-colors hover:text-[#c5a880] sm:inline-flex cursor-pointer"
          >
            <HeartIcon />
            {count > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex size-4 items-center justify-center rounded-full bg-[#c5a880] text-[9px] font-bold text-white">
                {count > 9 ? "9+" : count}
              </span>
            )}
          </Link>
          <CartNavLink />
        </div>
      </div>
    </header>
  );
}
