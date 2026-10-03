import Link from "next/link";
import { productPaths } from "@/features/products/paths";
import { cartPaths } from "@/features/cart/paths";

type CartSummaryProps = {
  total: number;
  quantity: number;
};

const DELIVERY_PRICE = 10;

export function CartSummary({ total }: CartSummaryProps) {
  return (
    <aside className="flex w-full flex-col gap-5 lg:gap-6">
      <h2 className="font-[family-name:var(--font-instrument-serif)] text-[32px] leading-none text-[#1a1a1a] sm:text-[36px]">Order Summary</h2>
      <div className="flex flex-col gap-5 rounded-lg bg-[#f4f0eb] p-5 sm:p-6">
        <div className="flex items-center justify-between gap-4 text-[12px]"><span className="text-[#605a54]">Subtotal</span><span className="font-semibold text-black">{total} USD</span></div>
        <div className="flex items-center justify-between gap-4 text-[12px]"><span className="text-[#605a54]">Delivery</span><span className="font-semibold text-black">{DELIVERY_PRICE} USD</span></div>
        <div className="h-px w-full bg-[#ebe6de]" />
        <div className="flex items-center justify-between gap-4 font-bold text-black"><span className="text-[12px]">Total</span><span className="text-[20px]">{total + DELIVERY_PRICE} USD</span></div>
        <Link href={cartPaths.checkout} className="flex min-h-12 w-full items-center justify-center rounded bg-[#1a1a1a] px-5 py-3 text-[12px] font-bold uppercase text-white transition-colors hover:bg-[#333333] cursor-pointer">Proceed to checkout</Link>
        <p className="text-center text-[9px] leading-4 text-[#605a54] sm:text-[10px]">Secure checkout {"\u00b7"} Visa {"\u00b7"} Mastercard {"\u00b7"} Amex</p>
      </div>
      <Link href={productPaths.list} className="text-center text-[11px] uppercase text-[#605a54] underline underline-offset-2 transition-colors hover:text-[#1a1a1a] cursor-pointer sm:text-[12px]">Continue shopping</Link>
    </aside>
  );
}
