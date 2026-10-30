"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import { parseProductListQuery } from "@/features/products/utils/product.utils";
import { toast } from "@/lib/toast";



export type FilterOption = {
  id: string;
  label: string;
};

type CheckboxTone = "gold" | "ink";

// Scent Family options 
const SCENT_FAMILIES: FilterOption[] = [
  { id: "woody", label: "Woody" },
  { id: "fresh", label: "Fresh" },
  { id: "floral", label: "Floral" },
  { id: "oriental", label: "Oriental" },
];

// Occasion options 
const OCCASIONS: FilterOption[] = [
  { id: "wedding", label: "Wedding" },
  { id: "personal-use", label: "Personal Use" },
  { id: "birthday", label: "Birthday" },
  { id: "gift-sets", label: "Gift Sets" },
];

// Gender options 
const GENDERS: FilterOption[] = [
  { id: "men", label: "Men" },
  { id: "women", label: "Women" },
  { id: "unisex", label: "Unisex" },
];

const MIN_PRICE = 0;
const MAX_PRICE = 500;

function FilterCheckbox({
  option,
  checked,
  tone,
  onChange,
}: {
  option: FilterOption;
  checked: boolean;
  tone: CheckboxTone;
  onChange: () => void;
}) {
  return (
    <label className="flex w-full cursor-pointer items-center gap-2.5">
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={onChange}
      />
      <span
        className={cn(
          "size-4 shrink-0 rounded-[2px] border border-solid border-[#ebe6de]",
          checked && tone === "gold" && "bg-[#c5a880]",
          checked && tone === "ink" && "bg-[#1a1a1a]",
          !checked && "bg-white",
        )}
      />
      <span className="text-[13px] font-normal whitespace-nowrap text-[#1a1a1a]">
        {option.label}
      </span>
    </label>
  );
}

function FilterBlock({
  title,
  options,
  selected,
  tone,
  onToggle,
}: {
  title: string;
  options: FilterOption[];
  selected: string[];
  tone: CheckboxTone;
  onToggle: (id: string) => void;
}) {
  return (
    <div className="flex w-full flex-col items-start gap-4">
      <p className="text-[12px] font-bold uppercase whitespace-nowrap text-[#1a1a1a]">
        {title}
      </p>
      <div className="flex w-full flex-col items-start gap-3">
        {options.map((option) => {
          const isChecked =
            selected.includes(option.id) ||
            selected.includes(option.label.toLowerCase()) ||
            selected.includes(option.id.toLowerCase());
          return (
            <FilterCheckbox
              key={option.id}
              option={option}
              tone={tone}
              checked={isChecked}
              onChange={() => onToggle(option.id)}
            />
          );
        })}
      </div>
    </div>
  );
}

function toggleValue(values: string[], id: string) {
  const normId = id.toLowerCase();
  const exists = values.some((v) => v.toLowerCase() === normId);
  return exists
    ? values.filter((value) => value.toLowerCase() !== normId)
    : [...values, id];
}

export function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  const currentQuery = parseProductListQuery(
    Object.fromEntries(searchParams.entries()),
  );

  // Scent Family 
  const urlScentFamilies = currentQuery.category
    ? currentQuery.category.split(",").map((s) => s.trim().toLowerCase())
    : [];
  const urlOccasions = currentQuery.occasion
    ? currentQuery.occasion.split(",").map((o) => o.trim().toLowerCase())
    : [];
  const urlGenders = currentQuery.gender
    ? currentQuery.gender.split(",").map((g) => g.trim().toLowerCase())
    : [];
  const urlMinPrice = currentQuery.minPrice ?? MIN_PRICE;
  const urlMaxPrice = currentQuery.maxPrice ?? MAX_PRICE;

  //  price state 

  const [localMinPrice, setLocalMinPrice] = useState(urlMinPrice);
  const [localMaxPrice, setLocalMaxPrice] = useState(urlMaxPrice);

  const updateFilters = (updates: Record<string, string | undefined>) => {
    const base = Object.fromEntries(searchParams.entries());
    const merged: Record<string, string> = { ...base };
    for (const [k, v] of Object.entries(updates)) {
      if (v === undefined || v === "") {
        delete merged[k];
      } else {
        merged[k] = v;
      }
    }
    merged.page = "1";
    const qs = new URLSearchParams(merged).toString();
    router.replace(`/shop${qs ? `?${qs}` : ""}`, { scroll: false });
  };

  // Scent Family 
  const handleScentFamilyToggle = (id: string) => {
    const next = toggleValue(urlScentFamilies, id);
    updateFilters({ category: next.length > 0 ? next.join(",") : undefined });
  };

  const handleOccasionToggle = (id: string) => {
    const next = toggleValue(urlOccasions, id);
    updateFilters({ occasion: next.length > 0 ? next.join(",") : undefined });
  };

  const handleGenderToggle = (id: string) => {
    const next = toggleValue(urlGenders, id);
    updateFilters({ gender: next.length > 0 ? next.join(",") : undefined });
  };

  const commitPriceChange = (min: number, max: number) => {
    updateFilters({
      minPrice: min > MIN_PRICE ? String(min) : undefined,
      maxPrice: max < MAX_PRICE ? String(max) : undefined,
    });
  };

  const handleClearFilters = () => {
    setLocalMinPrice(MIN_PRICE);
    setLocalMaxPrice(MAX_PRICE);
    router.replace("/shop", { scroll: false });
    toast.info("Filters cleared", {
      description: "All filters have been reset",
    });
  };

  const selectedCount =
    urlScentFamilies.length +
    urlOccasions.length +
    urlGenders.length +
    (urlMinPrice > MIN_PRICE || urlMaxPrice < MAX_PRICE ? 1 : 0);

  const minPricePercent =
    ((localMinPrice - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100;
  const maxPricePercent =
    ((localMaxPrice - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100;

  return (
    <aside className="w-full shrink-0 lg:w-[260px]">
      <button
        type="button"
        className="flex w-full items-center justify-between rounded border border-solid border-[#ebe6de] bg-white px-4 py-3 text-[12px] font-semibold uppercase text-[#1a1a1a] transition-colors hover:bg-[#f4f0eb] cursor-pointer lg:hidden"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span>Filters{selectedCount > 0 ? ` (${selectedCount})` : ""}</span>
        
        <img
          src="/icons/chevron-down.svg"
          alt=""
          width={14}
          height={14}
          className={cn("transition-transform", open && "rotate-180")}
        />
      </button>
      <div
        className={cn(
          "flex-col items-start gap-8",
          open ? "mt-6 flex" : "hidden",
          "lg:mt-0 lg:flex",
        )}
      >
        {selectedCount > 0 && (
          <>
            <button
              type="button"
              onClick={handleClearFilters}
              className="text-[12px] font-semibold uppercase text-[#c5a880] underline transition-colors hover:text-[#1a1a1a] cursor-pointer"
            >
              Clear All Filters
            </button>
            <div className="h-px w-full bg-[#ebe6de]" />
          </>
        )}
        <FilterBlock
          title="Scent Family"
          options={SCENT_FAMILIES}
          selected={urlScentFamilies}
          tone="ink"
          onToggle={handleScentFamilyToggle}
        />
        <div className="h-px w-full bg-[#ebe6de]" />
        <FilterBlock
          title="Occasion"
          options={OCCASIONS}
          selected={urlOccasions}
          tone="ink"
          onToggle={handleOccasionToggle}
        />
        <div className="h-px w-full bg-[#ebe6de]" />
        <FilterBlock
          title="Gender"
          options={GENDERS}
          selected={urlGenders}
          tone="ink"
          onToggle={handleGenderToggle}
        />
        <div className="h-px w-full bg-[#ebe6de]" />
        <div className="flex w-full flex-col items-start gap-4">
          <p className="text-[12px] font-bold uppercase whitespace-nowrap text-[#1a1a1a]">
            Price Range
          </p>
          <div className="flex w-full max-w-[260px] flex-col items-start gap-3 lg:max-w-none">
            <div className="relative flex h-1 w-full items-center bg-[#ebe6de]">
              <div
                className="absolute top-0 h-1 bg-[#c5a880]"
                style={{
                  left: `${minPricePercent}%`,
                  width: `${maxPricePercent - minPricePercent}%`,
                }}
              />
              {/* price slider */}
              <input
                type="range"
                min={MIN_PRICE}
                max={MAX_PRICE}
                value={localMinPrice}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value < localMaxPrice) setLocalMinPrice(value);
                }}
                onPointerUp={(e) => {
                  const value = Number((e.target as HTMLInputElement).value);
                  const safeMin = Math.min(value, localMaxPrice - 1);
                  setLocalMinPrice(safeMin);
                  commitPriceChange(safeMin, localMaxPrice);
                }}
                className="absolute w-full opacity-0 cursor-pointer"
                style={{ zIndex: localMinPrice > localMaxPrice - 50 ? 2 : 1 }}
              />
              {/* Max price slider */}
              <input
                type="range"
                min={MIN_PRICE}
                max={MAX_PRICE}
                value={localMaxPrice}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value > localMinPrice) setLocalMaxPrice(value);
                }}
                onPointerUp={(e) => {
                  const value = Number((e.target as HTMLInputElement).value);
                  const safeMax = Math.max(value, localMinPrice + 1);
                  setLocalMaxPrice(safeMax);
                  commitPriceChange(localMinPrice, safeMax);
                }}
                className="absolute w-full opacity-0 cursor-pointer"
                style={{ zIndex: localMaxPrice < localMinPrice + 50 ? 2 : 1 }}
              />
            </div>
            <div className="flex w-full items-start justify-between text-[12px] font-normal whitespace-nowrap text-[#1a1a1a]">
              <p>${localMinPrice}</p>
              <p>${localMaxPrice}</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

