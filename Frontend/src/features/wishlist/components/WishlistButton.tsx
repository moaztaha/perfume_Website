"use client";

import { useWishlist } from "@/features/wishlist/hooks/useWishlist";

type WishlistButtonProps = {
  productId: string;
  productName: string;
  productPrice: number;
  productImage?: string;
  variant?: "icon" | "text";
  className?: string;
};

export function WishlistButton({
  productId,
  productName,
  productPrice,
  productImage,
  variant = "icon",
  className = "",
}: WishlistButtonProps) {
  const { addItem, removeItem, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(productId);

  const handleToggle = () => {
    if (inWishlist) {
      removeItem(productId);
    } else {
      addItem({
        productId,
        name: productName,
        price: productPrice,
        image: productImage,
      });
    }
  };

  if (variant === "text") {
    return (
      <button
        type="button"
        onClick={handleToggle}
        className={`inline-flex items-center justify-center gap-2 rounded border border-[#ebe6de] px-4 py-3 text-[11px] font-semibold uppercase tracking-wide transition-colors hover:bg-[#f4f0eb] cursor-pointer ${
          inWishlist ? "bg-[#f4f0eb] border-[#c5a880]" : "bg-white"
        } ${className}`}
      >
        <HeartIcon filled={inWishlist} />
        {inWishlist ? "In Wishlist" : "Add to Wishlist"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={
        inWishlist ? "Remove from wishlist" : "Add to wishlist"
      }
      className={`flex size-10 items-center justify-center rounded-full border border-[#ebe6de] bg-white transition-all hover:bg-[#f4f0eb] hover:border-[#c5a880] cursor-pointer ${
        inWishlist ? "bg-[#f4f0eb] border-[#c5a880]" : ""
      } ${className}`}
    >
      <HeartIcon filled={inWishlist} />
    </button>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  if (filled) {
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 15.75L7.9125 14.7675C4.05 11.28 1.5 9 1.5 6.1875C1.5 3.9075 3.1575 2.25 5.4375 2.25C6.72 2.25 7.9575 2.8425 9 3.7725C10.0425 2.8425 11.28 2.25 12.5625 2.25C14.8425 2.25 16.5 3.9075 16.5 6.1875C16.5 9 13.95 11.28 10.0875 14.775L9 15.75Z"
          fill="#c5a880"
        />
      </svg>
    );
  }

  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 15.75L7.9125 14.7675C4.05 11.28 1.5 9 1.5 6.1875C1.5 3.9075 3.1575 2.25 5.4375 2.25C6.72 2.25 7.9575 2.8425 9 3.7725C10.0425 2.8425 11.28 2.25 12.5625 2.25C14.8425 2.25 16.5 3.9075 16.5 6.1875C16.5 9 13.95 11.28 10.0875 14.775L9 15.75Z"
        stroke="#605a54"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
