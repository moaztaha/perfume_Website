"use client";

import Image from "next/image";
import type { AdminProduct } from "../types/admin.types";

type ProductTableRowProps = {
  product: AdminProduct;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
};

export function getProductStatusColor(status: AdminProduct["status"]) {
  switch (status) {
    case "In Stock":
      return "text-green-700 bg-green-50";
    case "Low Stock":
      return "text-yellow-700 bg-yellow-50";
    case "Out of Stock":
      return "text-red-700 bg-red-50";
    default:
      return "text-gray-700 bg-gray-50";
  }
}

export function ProductTableRow({ product, onDelete, onEdit }: ProductTableRowProps) {
  return (
    <tr className="border-b border-[#ebe6de] transition-colors hover:bg-[#faf8f5]">
      {/* Product Details */}
      <td className="py-4 pl-6 pr-4">
        <div className="flex items-center gap-4">
          <div className="relative size-12 shrink-0 overflow-hidden rounded bg-[#f4f0eb]">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="48px"
                className="object-cover"
              />
            ) : (
              <div className="flex size-full items-center justify-center text-[8px] uppercase tracking-wider text-[#8a837a]">
                No Image
              </div>
            )}
          </div>
          <div>
            <p className="font-[family-name:var(--font-instrument-serif)] text-[16px] leading-tight text-[#1a1a1a]">
              {product.name}
            </p>
            <p className="mt-0.5 text-[12px] text-[#8a837a]">
              {product.collection}
            </p>
          </div>
        </div>
      </td>

      {/* Price */}
      <td className="px-4 py-4">
        <p className="text-[14px] font-semibold text-[#1a1a1a]">
          {product.price === null ? "—" : `$${product.price.toFixed(2)}`}
        </p>
      </td>

      {/* Stock */}
      <td className="px-4 py-4">
        <p className="text-[14px] text-[#605a54]">{product.stock === null ? "—" : `${product.stock} pcs`}</p>
      </td>

      {/* Status */}
      <td className="px-4 py-4">
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${getProductStatusColor(
            product.status
          )}`}
        >
          {product.status}
        </span>
      </td>

      {/* Actions */}
      <td className="px-4 py-4 pr-6">
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => onEdit(product.id)}
            className="flex size-8 items-center justify-center rounded transition-colors hover:bg-[#ebe6de]"
            aria-label={`Edit ${product.name}`}
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
                d="M11.3333 2.00004C11.5084 1.82494 11.7163 1.68605 11.9451 1.59129C12.1739 1.49653 12.4191 1.44775 12.6666 1.44775C12.9142 1.44775 13.1594 1.49653 13.3882 1.59129C13.617 1.68605 13.8249 1.82494 14 2.00004C14.1751 2.17513 14.314 2.383 14.4087 2.61182C14.5035 2.84064 14.5523 3.08584 14.5523 3.33337C14.5523 3.58091 14.5035 3.82611 14.4087 4.05493C14.314 4.28375 14.1751 4.49162 14 4.66671L5.00001 13.6667L1.33334 14.6667L2.33334 11L11.3333 2.00004Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => onDelete(product.id)}
            className="flex size-8 items-center justify-center rounded transition-colors hover:bg-red-50"
            aria-label={`Delete ${product.name}`}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-red-600"
            >
              <path
                d="M2 4H14M12.6667 4V13.3333C12.6667 14 12 14.6667 11.3333 14.6667H4.66667C4 14.6667 3.33333 14 3.33333 13.3333V4M5.33333 4V2.66667C5.33333 2 6 1.33333 6.66667 1.33333H9.33333C10 1.33333 10.6667 2 10.6667 2.66667V4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
}
