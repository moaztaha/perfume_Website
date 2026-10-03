import type { Product } from "@/features/products/types/product.types";
import { formatWholePrice } from "@/features/products/utils/product.utils";

type ProductDetailsProps = {
  product: Product;
  currentPrice?: number;
  children?: React.ReactNode;
};

/** US-04: product header information (tags, title, price, status). */
export function ProductDetailsHeader({
  product,
  currentPrice,
}: {
  product: Product;
  currentPrice?: number;
}) {
  const priceToDisplay = currentPrice ?? product.price;
  const statusText = product.inStockStatus ?? "Available in Atelier";
  const scentFamily = product.scentFamily || "Woody";
  const occasion = product.occasion || "Evening";

  return (
    <div className="space-y-3">
      {/* Category / Occasion Badges */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded bg-[#f4f0eb] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#605a54]">
          Scent Family: {scentFamily}
        </span>
        <span className="rounded bg-[#f4f0eb] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#605a54]">
          Occasion: {occasion}
        </span>
      </div>

      {/* Product Title */}
      <h1 className="font-[family-name:var(--font-instrument-serif)] text-[36px] sm:text-[44px] lg:text-[48px] font-normal leading-[1.15] text-[#1a1a1a]">
        {product.name}
      </h1>

      {/* Price & Availability Status */}
      <div className="flex items-center justify-between pt-1">
        <p className="text-[24px] font-semibold text-[#1a1a1a]">
          {formatWholePrice(priceToDisplay)}
        </p>
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-[#10b981]" aria-hidden="true" />
          <span className="text-[13px] font-semibold text-[#10b981]">
            {statusText}
          </span>
        </div>
      </div>
    </div>
  );
}

/** US-04: Scent Anatomy narrative and notes pyramid. */
export function ProductScentAnatomy({ product }: { product: Product }) {
  const pyramid = product.notesPyramid ?? {
    top: "Sicilian Bergamot, Pink Pepper",
    heart: "Egyptian Jasmine Sambac, Papyrus",
    base: "West Indian Sandalwood, Cardamom, Amber",
  };

  return (
    <div className="space-y-4 pt-2">
      <h2 className="font-[family-name:var(--font-instrument-serif)] text-[28px] sm:text-[32px] font-normal text-[#1a1a1a]">
        Scent Anatomy
      </h2>
      <p className="text-[14px] leading-relaxed text-[#605a54]">
        {product.description}
      </p>

      {/* Notes Pyramid Table */}
      <div className="divide-y divide-[#ebe6de] border-t border-b border-[#ebe6de] pt-1">
        {pyramid.top && (
          <div className="flex items-center justify-between py-2.5">
            <span className="text-[12px] font-bold text-[#1a1a1a]">Top Notes</span>
            <span className="text-[13px] text-[#605a54] text-right">{pyramid.top}</span>
          </div>
        )}
        {pyramid.heart && (
          <div className="flex items-center justify-between py-2.5">
            <span className="text-[12px] font-bold text-[#1a1a1a]">Heart Notes</span>
            <span className="text-[13px] text-[#605a54] text-right">{pyramid.heart}</span>
          </div>
        )}
        {pyramid.base && (
          <div className="flex items-center justify-between py-2.5">
            <span className="text-[12px] font-bold text-[#1a1a1a]">Base Notes</span>
            <span className="text-[13px] text-[#605a54] text-right">{pyramid.base}</span>
          </div>
        )}
      </div>
    </div>
  );
}

/** Combined ProductDetails component. */
export function ProductDetails({
  product,
  currentPrice,
  children,
}: ProductDetailsProps) {
  return (
    <div className="space-y-6">
      <ProductDetailsHeader product={product} currentPrice={currentPrice} />
      <hr className="border-t border-[#ebe6de]" />
      {children}
      {children && <hr className="border-t border-[#ebe6de]" />}
      <ProductScentAnatomy product={product} />
    </div>
  );
}
