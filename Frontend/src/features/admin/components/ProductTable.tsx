"use client";

import { useState } from "react";
import Image from "next/image";
import type { AdminProduct } from "../types/admin.types";
import { getProductStatusColor, ProductTableRow } from "./ProductTableRow";

type ProductTableProps = {
  products: AdminProduct[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function ProductTable({ 
  products, 
  onDelete, 
  onEdit,
  currentPage,
  totalPages,
  onPageChange 
}: ProductTableProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="rounded-lg border border-[#ebe6de] bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-[#ebe6de] p-4 sm:p-6">
        <div className="flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center">
          <h2 className="font-[family-name:var(--font-instrument-serif)] text-[24px] leading-tight text-[#1a1a1a]">
            Fragrance Collection
          </h2>
          <div className="flex w-full items-center gap-3 sm:w-auto">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search perfumes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-full rounded border border-[#ebe6de] bg-[#faf8f5] pl-10 pr-4 text-[13px] text-[#1a1a1a] placeholder-[#8a837a] transition-colors focus:border-[#1a1a1a] focus:outline-none sm:w-64"
              />
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a837a]"
              >
                <path
                  d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 14L11.1 11.1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="hidden overflow-x-auto xl:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#ebe6de] bg-[#faf8f5]">
              <th className="py-3 pl-6 pr-4 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8a837a]">
                Product Details
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8a837a]">
                Price
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8a837a]">
                Stock
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8a837a]">
                Status
              </th>
              <th className="px-4 py-3 pr-6 text-right text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8a837a]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductTableRow
                  key={product.id}
                  product={product}
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-12 text-center">
                  <p className="text-[14px] text-[#8a837a]">
                    No products found matching your search.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="space-y-3 p-3 sm:p-4 xl:hidden">
        {filteredProducts.length > 0 ? filteredProducts.map((product) => (
          <article key={product.id} className="rounded-lg border border-[#ebe6de] bg-white p-3 sm:p-4">
            <div className="flex gap-3">
              <div className="relative size-20 shrink-0 overflow-hidden rounded bg-[#f4f0eb]">
                {product.image ? <Image src={product.image} alt={product.name} fill sizes="80px" className="object-cover" /> : <div className="flex size-full items-center justify-center text-[8px] uppercase tracking-wider text-[#8a837a]">No Image</div>}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-[family-name:var(--font-instrument-serif)] text-[18px] leading-tight text-[#1a1a1a]">{product.name}</h3>
                {product.collection && <p className="mt-1 truncate text-[12px] text-[#8a837a]">{product.collection}</p>}
                <p className="mt-2 text-[14px] font-semibold text-[#1a1a1a]">{product.price === null ? "—" : `$${product.price.toFixed(2)}`}</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#ebe6de] pt-3">
              <div className="flex items-center gap-2 text-[12px] text-[#605a54]">
                <span>{product.stock === null ? "Stock unavailable" : `${product.stock} pcs`}</span>
                <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${getProductStatusColor(product.status)}`}>{product.status}</span>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => onEdit(product.id)} className="rounded border border-[#ebe6de] px-3 py-1.5 text-[12px] font-medium text-[#605a54] hover:bg-[#faf8f5]" aria-label={`Edit ${product.name}`}>Edit</button>
                <button type="button" onClick={() => onDelete(product.id)} className="rounded border border-red-100 px-3 py-1.5 text-[12px] font-medium text-red-700 hover:bg-red-50" aria-label={`Delete ${product.name}`}>Delete</button>
              </div>
            </div>
          </article>
        )) : <div className="rounded-lg bg-white px-4 py-10 text-center text-[14px] text-[#8a837a]">No products found matching your search.</div>}
      </div>

      {/* Footer with Pagination */}
      <div className="border-t border-[#ebe6de] px-4 py-4 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <p className="text-[12px] text-[#8a837a]">
            Showing page {currentPage} of {totalPages}
          </p>
          <div className="flex max-w-full flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex h-8 items-center justify-center rounded border border-[#ebe6de] px-3 text-[12px] font-medium text-[#605a54] transition-colors hover:bg-[#faf8f5] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => onPageChange(page)}
                className={`flex size-8 items-center justify-center rounded border text-[12px] font-medium transition-colors ${
                  page === currentPage
                    ? "border-[#1a1a1a] bg-[#1a1a1a] text-white"
                    : "border-[#ebe6de] text-[#605a54] hover:bg-[#faf8f5]"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              type="button"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex h-8 items-center justify-center rounded border border-[#ebe6de] px-3 text-[12px] font-medium text-[#605a54] transition-colors hover:bg-[#faf8f5] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
