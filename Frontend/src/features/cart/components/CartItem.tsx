"use client";

import Image from "next/image";
import type { CartLine } from "@/features/cart/types/cart.types";

type CartItemProps = {
  line: CartLine;
  onIncrement: (lineId: string) => void;
  onDecrement: (lineId: string) => void;
  onRemove: (lineId: string) => void;
};

export function CartItem({ line, onIncrement, onDecrement, onRemove }: CartItemProps) {
  const options = Object.values(line.selectedOptions).join(" / ");

  return (
    <article className="flex w-full items-center gap-4 rounded-lg border border-[#ebe6de] bg-white p-3 shadow-[0_8px_24px_rgba(26,26,26,0.04)] sm:gap-5 sm:p-4">
      <div className="relative size-[100px] shrink-0 overflow-hidden rounded bg-[#f4f0eb] sm:size-[150px]">
        {line.image ? (
          <Image src={line.image} alt={line.name} fill sizes="(min-width: 640px) 150px, 100px" className="rounded object-cover" />
        ) : (
          <div className="flex size-full items-center justify-center text-[10px] uppercase tracking-[0.16em] text-[#8a837a]">Fragrance</div>
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex items-start justify-between gap-3 text-[#1a1a1a]">
          <h2 className="font-[family-name:var(--font-instrument-serif)] text-[22px] leading-tight sm:text-[27px]">{line.name}</h2>
          <p className="shrink-0 pt-1 text-[14px] font-semibold sm:text-[15px]">{line.price} USD</p>
        </div>
        {options ? <p className="text-[11px] uppercase tracking-[0.04em] text-[#c5a880] sm:text-[12px]">{options}</p> : null}
        <div className="mt-auto flex items-center justify-between gap-3 pt-1">
          <div className="flex h-10 items-center gap-4 rounded border border-[#ebe6de] px-3 text-[12px]">
            <button 
              type="button" 
              className="text-[#605a54] transition-colors hover:text-[#1a1a1a] cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-[#605a54]" 
              onClick={() => onDecrement(line.id)} 
              disabled={line.quantity <= 1}
              aria-label={"Decrease quantity of " + line.name}
            >
              -
            </button>
            <span className="font-semibold text-black">{line.quantity}</span>
            <button type="button" className="text-[#605a54] transition-colors hover:text-[#1a1a1a] cursor-pointer" onClick={() => onIncrement(line.id)} aria-label={"Increase quantity of " + line.name}>+</button>
          </div>
          <button type="button" className="text-[10px] font-medium uppercase tracking-[0.08em] text-[#605a54] underline underline-offset-2 transition-colors hover:text-[#1a1a1a] cursor-pointer sm:text-[11px]" onClick={() => onRemove(line.id)}>Remove</button>
        </div>
      </div>
    </article>
  );
}
