"use client";

import { Select } from "@/components/ui/Select";
import type { Product } from "@/features/products/types/product.types";
import { formatWholePrice } from "@/features/products/utils/product.utils";

type ProductOptionsProps = {
  product: Product;
  selectedOptions: Record<string, string>;
  onChange: (optionId: string, value: string) => void;
  giftWrapping?: boolean;
  onToggleGiftWrapping?: (enabled: boolean) => void;
};

/**  luxury selectable product options  */
export function ProductOptions({
  product,
  selectedOptions,
  onChange,
  giftWrapping = false,
  onToggleGiftWrapping,
}: ProductOptionsProps) {
  const volumeOptions =
    product.volumeOptions && product.volumeOptions.length > 0
      ? product.volumeOptions
      : product.options.find((o) => o.id === "volume" || o.name.toLowerCase() === "volume")
          ? product.options
              .find((o) => o.id === "volume" || o.name.toLowerCase() === "volume")!
              .values.map((val) => ({
                size: val,
                price: product.price,
              }))
          : [
              { size: "30 ml", price: 140 },
              { size: "50 ml", price: 180 },
              { size: "100 ml", price: product.price },
            ];

  const currentVolume =
    selectedOptions["volume"] ?? volumeOptions[volumeOptions.length - 1]?.size ?? "100 ml";

  const otherOptions = product.options.filter(
    (o) => o.id !== "volume" && o.name.toLowerCase() !== "volume",
  );

  return (
    <div className="space-y-6">
      {/* Volume Selector */}
      <div className="space-y-3">
        <label className="block text-[12px] font-bold uppercase tracking-wider text-[#1a1a1a]">
          Select Volume
        </label>
        <div className="grid grid-cols-3 gap-3">
          {volumeOptions.map((vol) => {
            const isSelected = currentVolume === vol.size;
            return (
              <button
                key={vol.size}
                type="button"
                onClick={() => onChange("volume", vol.size)}
                className={`flex flex-col items-start justify-center rounded border p-3 text-left transition-all cursor-pointer ${
                  isSelected
                    ? "border-[#1a1a1a] bg-white shadow-sm"
                    : "border-[#ebe6de] bg-transparent hover:border-[#c5a880] hover:bg-[#f4f0eb]"
                }`}
                aria-pressed={isSelected}
              >
                <span
                  className={`text-[14px] leading-tight text-[#1a1a1a] ${
                    isSelected ? "font-bold" : "font-medium"
                  }`}
                >
                  {vol.size}
                </span>
                <span className="mt-1 text-[11px] text-[#605a54]">
                  {formatWholePrice(vol.price)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/*  Gift Wrapping */}
      <div className="flex items-center justify-between gap-4 rounded-lg bg-[#f4f0eb] p-5">
        <div className="flex flex-col gap-1">
          <span className="text-[13px] font-semibold text-[#1a1a1a]">
            Complimentary Signature Gift Wrapping
          </span>
          <span className="text-[12px] leading-relaxed text-[#605a54]">
            Encased in linen paper box with custom wax seal stamp.
          </span>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={giftWrapping}
          onClick={() => onToggleGiftWrapping?.(!giftWrapping)}
          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a880] focus-visible:ring-offset-2 ${
            giftWrapping ? "bg-[#c5a880]" : "bg-[#ebe6de]"
          }`}
          aria-label="Toggle complimentary signature gift wrapping"
        >
          <span
            className={`pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
              giftWrapping ? "translate-x-5" : "translate-x-0.5"
            } mt-0.5`}
          />
        </button>
      </div>

      {otherOptions.length > 0 && (
        <div className="space-y-3">
          {otherOptions.map((option) => (
            <label key={option.id} className="block">
              <span className="mb-1 block text-sm font-medium text-[#1a1a1a]">
                {option.name}
              </span>
              <Select
                value={selectedOptions[option.id] ?? option.values[0]}
                onChange={(event) => onChange(option.id, event.target.value)}
              >
                {option.values.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </Select>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
