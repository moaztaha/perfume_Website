"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { buildProductQueryString, parseProductListQuery } from "@/features/products/utils/product.utils";

type ProductPaginationProps = {
  page: number;
  pageSize: number;
  total: number;
};

export function ProductPagination({
  page,
  pageSize,
  total,
}: ProductPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentQuery = parseProductListQuery(Object.fromEntries(searchParams.entries()));
  
  const pageCount = Math.max(1, Math.ceil(total / pageSize));

  if (pageCount <= 1) {
    return null;
  }

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > pageCount || newPage === page) {
      return;
    }

    const newQuery = {
      ...currentQuery,
      page: newPage,
    };
    
    const queryString = buildProductQueryString(newQuery);
    router.push(`/shop${queryString ? `?${queryString}` : ""}`);
  };

  return (
    <div className="flex w-full items-center justify-center gap-4 pt-8 lg:pt-10">
      <button
        type="button"
        className="rounded border border-solid border-[#ebe6de] p-3 transition-colors hover:bg-[#f4f0eb] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent cursor-pointer"
        disabled={page <= 1}
        onClick={() => handlePageChange(page - 1)}
        aria-label="Previous page"
      >
        <img src="/icons/arrow-left.svg" alt="" width={14} height={14} />
      </button>
      <p className="text-[13px] font-normal whitespace-nowrap text-[#605a54]">
        Page {page} of {pageCount}
      </p>
      <button
        type="button"
        className="rounded border border-solid border-[#ebe6de] bg-[#1a1a1a] p-3 transition-colors hover:bg-[#333333] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#1a1a1a] cursor-pointer"
        disabled={page >= pageCount}
        onClick={() => handlePageChange(page + 1)}
        aria-label="Next page"
      >
        <img src="/icons/arrow-right.svg" alt="" width={14} height={14} />
      </button>
    </div>
  );
}
