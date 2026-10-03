"use client";

import Link from "next/link";
import { CartItem } from "@/features/cart/components/CartItem";
import { CartSummary } from "@/features/cart/components/CartSummary";
import { useCart } from "@/features/cart/hooks/useCart";
import { productPaths } from "@/features/products/paths";

export function CartPage() {
  const { lines, total, quantity, increment, decrement, removeItem } = useCart();
  return (
    <section className="min-h-[calc(100vh-125px)] bg-[#faf8f5]">
      <nav aria-label="Breadcrumb" className="px-4 py-5 text-[12px] text-[#605a54] sm:px-6 sm:py-6 lg:px-20">
        <Link href={productPaths.list} className="transition-colors hover:text-[#1a1a1a]">Home</Link><span className="mx-2" aria-hidden="true">/</span><span className="text-[#1a1a1a]">Cart</span>
      </nav>
      {lines.length === 0 ? (
        <div className="px-4 pb-16 sm:px-6 lg:px-20">
          <div className="mx-auto flex min-h-72 max-w-7xl flex-col items-center justify-center rounded-lg border border-[#ebe6de] bg-white px-6 text-center shadow-[0_8px_24px_rgba(26,26,26,0.04)]">
            <h1 className="font-[family-name:var(--font-instrument-serif)] text-[40px] leading-none text-[#1a1a1a] sm:text-[56px]">Your Cart</h1>
            <p className="mt-4 max-w-sm text-[13px] leading-6 text-[#605a54]">Your bag is waiting to be discovered. Explore our collection and find a fragrance that feels uniquely yours.</p>
            <Link href={productPaths.list} className="mt-7 inline-flex h-12 items-center justify-center rounded bg-[#1a1a1a] px-6 text-[12px] font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#333333]">Continue Shopping</Link>
          </div>
        </div>
      ) : (
        <div className="grid items-start gap-10 px-4 pb-16 pt-1 sm:px-6 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-16 lg:px-20 lg:pb-[100px]">
          <div className="flex min-w-0 flex-col gap-5">
            <div className="flex items-end justify-between gap-4">
              <h1 className="font-[family-name:var(--font-instrument-serif)] text-[44px] leading-none text-[#1a1a1a] sm:text-[56px]">Your Cart</h1>
              <p className="pb-1 text-[12px] uppercase text-[#605a54]">{quantity} {quantity === 1 ? "item" : "items"}</p>
            </div>
            <div className="flex flex-col gap-5">
              {lines.map((line) => <CartItem key={line.id} line={line} onIncrement={increment} onDecrement={decrement} onRemove={removeItem} />)}
            </div>
          </div>
          <CartSummary total={total} quantity={quantity} />
        </div>
      )}
    </section>
  );
}
