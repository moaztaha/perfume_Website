"use client";

import Link from "next/link";
import { useCart } from "@/features/cart/hooks/useCart";
import { cartPaths } from "@/features/cart/paths";

export function CartNavLink() {
  const { quantity } = useCart();
  return (
    <Link href={cartPaths.cart} aria-label={"Shopping bag" + (quantity > 0 ? ", " + quantity + " items" : "")} className="inline-flex items-center gap-1.5 text-[#1a1a1a]">
      <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none"><path d="M5.5 8.5h13l1 12h-15l1-12Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M9 9V6a3 3 0 0 1 6 0v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
      {quantity > 0 ? <span className="rounded-full bg-[#c5a880] px-1.5 py-0.5 text-[10px] font-bold leading-none text-white">{quantity}</span> : null}
    </Link>
  );
}
