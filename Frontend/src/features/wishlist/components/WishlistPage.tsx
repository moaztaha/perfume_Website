"use client";

import Link from "next/link";
import Image from "next/image";
import { useWishlist } from "@/features/wishlist/hooks/useWishlist";
import { useCart } from "@/features/cart/hooks/useCart";
import { productPaths } from "@/features/products/paths";

export function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlist();
  const { addItem: addToCart } = useCart();

  const handleAddToCart = (item: typeof items[0]) => {
    addToCart({
      productId: item.productId,
      name: item.name,
      price: item.price,
      image: item.image,
      selectedOptions: {},
    });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#faf8f5]">
        <div className="px-4 pb-16 pt-12 sm:px-6 lg:px-20">
          <div className="mx-auto flex min-h-96 max-w-7xl flex-col items-center justify-center rounded-lg border border-[#ebe6de] bg-white px-6 text-center shadow-[0_8px_24px_rgba(26,26,26,0.04)]">
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mb-6 text-[#ebe6de]"
            >
              <path
                d="M32 54L28.3 50.7C15.8 39.6 8 32.4 8 23.5C8 16.3 13.3 11 20.5 11C24.24 11 27.91 12.69 32 15.87C36.09 12.69 39.76 11 43.5 11C50.7 11 56 16.3 56 23.5C56 32.4 48.2 39.6 35.7 50.7L32 54Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h1 className="font-[family-name:var(--font-instrument-serif)] text-[40px] leading-none text-[#1a1a1a] sm:text-[56px]">
              Your wishlist is empty
            </h1>
            <p className="mt-4 max-w-sm text-[13px] leading-6 text-[#605a54]">
              Save your favorite fragrances here to revisit them later.
            </p>
            <Link
              href={productPaths.list}
              className="mt-7 inline-flex h-12 items-center justify-center rounded bg-[#1a1a1a] px-6 text-[12px] font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#333333] cursor-pointer"
            >
              Explore Fragrances
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <div className="px-4 pb-16 pt-12 sm:px-6 lg:px-20">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-[family-name:var(--font-instrument-serif)] text-[40px] leading-none text-[#1a1a1a] sm:text-[56px]">
                Wishlist
              </h1>
              <p className="mt-2 text-[13px] text-[#605a54]">
                {items.length} {items.length === 1 ? "item" : "items"} saved
              </p>
            </div>
            {items.length > 0 && (
              <button
                type="button"
                onClick={clearWishlist}
                className="text-[12px] font-semibold uppercase text-[#605a54] underline transition-colors hover:text-[#1a1a1a] cursor-pointer"
              >
                Clear Wishlist
              </button>
            )}
          </div>

          {/* Wishlist Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((item) => (
              <article
                key={item.id}
                className="flex flex-col gap-4 rounded-lg border border-[#ebe6de] bg-white p-4 shadow-[0_8px_24px_rgba(26,26,26,0.04)]"
              >
                {/* Product Image */}
                <Link
                  href={`${productPaths.list}/${item.productId}`}
                  className="group relative aspect-[3/4] overflow-hidden rounded bg-[#f4f0eb] transition-transform hover:scale-[1.02] cursor-pointer"
                >
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center text-[10px] uppercase tracking-[0.16em] text-[#8a837a]">
                      Fragrance
                    </div>
                  )}
                </Link>

                {/* Product Info */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      href={`${productPaths.list}/${item.productId}`}
                      className="flex-1 cursor-pointer"
                    >
                      <h2 className="font-[family-name:var(--font-instrument-serif)] text-[22px] leading-tight text-[#1a1a1a] transition-colors hover:text-[#605a54]">
                        {item.name}
                      </h2>
                    </Link>
                    <span className="shrink-0 text-[15px] font-semibold text-[#1a1a1a]">
                      ${item.price}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleAddToCart(item)}
                      className="flex-1 rounded bg-[#1a1a1a] py-3 text-[11px] font-semibold uppercase text-white transition-colors hover:bg-[#333333] cursor-pointer"
                    >
                      Add to Cart
                    </button>
                    <button
                      type="button"
                      onClick={() => removeItem(item.productId)}
                      aria-label="Remove from wishlist"
                      className="flex size-11 shrink-0 items-center justify-center rounded border border-[#ebe6de] transition-colors hover:bg-[#f4f0eb] hover:border-[#d4736a] cursor-pointer"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-[#605a54]"
                      >
                        <path
                          d="M4 4L12 12M12 4L4 12"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
