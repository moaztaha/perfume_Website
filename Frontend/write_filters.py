import textwrap

content = textwrap.dedent("""
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

const SCENT_FAMILIES: FilterOption[] = [
  { id: "woody", label: "Woody" },
  { id: "fresh", label: "Fresh" },
  { id: "floral", label: "Floral" },
  { id: "oriental", label: "Oriental" },
];

const OCCASIONS: FilterOption[] = [
  { id: "wedding", label: "Wedding" },
  { id: "personal-use", label: "Personal Use" },
  { id: "birthday", label: "Birthday" },
  { id: "gift-sets", label: "Gift Sets" },
];

const GENDERS: FilterOption[] = [
  { id: "men", label: "Men" },
  { id: "women", label: "Women" },
  { id: "unisex", label: "Unisex" },
];

const MIN_PRICE = 0;
const MAX_PRICE = 500;
""").lstrip()

with open(r"src\features\products\components\ProductFilters.tsx", "w", encoding="utf-8") as f:
    f.write(content)
print("ok:", len(content))

