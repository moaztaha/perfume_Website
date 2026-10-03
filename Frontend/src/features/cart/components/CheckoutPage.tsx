"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/features/cart/hooks/useCart";
import { cartPaths } from "@/features/cart/paths";
import { productPaths } from "@/features/products/paths";
import { toast } from "@/lib/toast";

// Replace with your actual WhatsApp business number (include country code without + or spaces)
const WHATSAPP_NUMBER = "201156797613"; // Example: "201234567890" for Egypt

export function CheckoutPage() {
  const { lines, total } = useCart();
  const [formData, setFormData] = useState({
    recipientName: "",
    phoneNumber: "",
    deliveryAddress: "",
    city: "",
    postalCode: "",
    deliveryNote: "",
  });

  const deliveryFee = 10;
  const subtotal = total;
  const orderTotal = subtotal + deliveryFee;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const buildWhatsAppMessage = () => {
    let message = "🛍️ *New Order*\n\n";
    
    // Customer details
    message += "👤 *Customer Information*\n";
    message += `Name: ${formData.recipientName}\n`;
    message += `Phone: ${formData.phoneNumber}\n\n`;
    
    // Delivery details
    message += "📍 *Delivery Address*\n";
    message += `Address: ${formData.deliveryAddress}\n`;
    message += `City: ${formData.city}\n`;
    message += `Postal Code: ${formData.postalCode}\n`;
    if (formData.deliveryNote.trim()) {
      message += `Note: ${formData.deliveryNote}\n`;
    }
    message += "\n";
    
    // Cart items
    message += "🛒 *Order Items*\n";
    lines.forEach((line, index) => {
      message += `${index + 1}. ${line.name}\n`;
      message += `   Qty: ${line.quantity} × $${line.price.toFixed(2)} = $${(line.quantity * line.price).toFixed(2)}\n`;
    });
    message += "\n";
    
    // Order summary
    message += "💰 *Order Summary*\n";
    message += `Subtotal: $${subtotal.toFixed(2)}\n`;
    message += `Delivery: $${deliveryFee.toFixed(2)}\n`;
    message += `*Total: $${orderTotal.toFixed(2)}*\n`;
    
    return message;
  };

  const handlePlaceOrder = () => {
    // Validate form
    if (!isFormValid) {
      toast.error("Form incomplete", {
        description: "Please fill in all required delivery details",
      });
      return;
    }
    
    // Build WhatsApp message
    const message = buildWhatsAppMessage();
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, "_blank");
    
    // Show success toast
    toast.success("Opening WhatsApp", {
      description: "Complete your order via WhatsApp chat",
    });
  };

  const isFormValid =
    formData.recipientName.trim() !== "" &&
    formData.phoneNumber.trim() !== "" &&
    formData.deliveryAddress.trim() !== "" &&
    formData.city.trim() !== "" &&
    formData.postalCode.trim() !== "";

  // If cart is empty, show empty state
  if (lines.length === 0) {
    return (
      <div className="min-h-screen bg-[#faf8f5]">
        <nav
          aria-label="Breadcrumb"
          className="px-4 py-6 text-[12px] text-[#605a54] sm:px-6 lg:px-20"
        >
          <Link
            href={productPaths.list}
            className="transition-colors hover:text-[#1a1a1a]"
          >
            Home
          </Link>
          <span className="mx-2" aria-hidden="true">
            /
          </span>
          <Link
            href={cartPaths.cart}
            className="transition-colors hover:text-[#1a1a1a]"
          >
            Cart
          </Link>
          <span className="mx-2" aria-hidden="true">
            /
          </span>
          <span className="text-[#1a1a1a]">Checkout</span>
        </nav>
        <div className="px-4 pb-16 sm:px-6 lg:px-20">
          <div className="mx-auto flex min-h-72 max-w-7xl flex-col items-center justify-center rounded-lg border border-[#ebe6de] bg-white px-6 text-center shadow-[0_8px_24px_rgba(26,26,26,0.04)]">
            <h1 className="font-[family-name:var(--font-instrument-serif)] text-[40px] leading-none text-[#1a1a1a] sm:text-[56px]">
              Your cart is empty
            </h1>
            <p className="mt-4 max-w-sm text-[13px] leading-6 text-[#605a54]">
              Add items to your cart before proceeding to checkout.
            </p>
            <Link
              href={productPaths.list}
              className="mt-7 inline-flex h-12 items-center justify-center rounded bg-[#1a1a1a] px-6 text-[12px] font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#333333] cursor-pointer"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className="px-4 py-6 text-[12px] text-[#605a54] sm:px-6 lg:px-20"
      >
        <Link
          href={productPaths.list}
          className="transition-colors hover:text-[#1a1a1a] cursor-pointer"
        >
          Home
        </Link>
        <span className="mx-2" aria-hidden="true">
          /
        </span>
        <Link
          href={cartPaths.cart}
          className="transition-colors hover:text-[#1a1a1a] cursor-pointer"
        >
          Cart
        </Link>
        <span className="mx-2" aria-hidden="true">
          /
        </span>
        <span className="text-[#1a1a1a]">Checkout</span>
      </nav>

      {/* Main content */}
      <div className="grid gap-9 px-4 pb-24 pt-4 sm:px-6 lg:grid-cols-[1fr_400px] lg:gap-9 lg:px-20">
        {/* Left column - Delivery details */}
        <div className="flex min-w-0 flex-col gap-7">
          {/* Heading */}
          <div className="flex flex-col gap-2">
            <h1 className="font-[family-name:var(--font-instrument-serif)] text-[48px] leading-[1.3] text-[#1a1a1a] sm:text-[56px]">
              Checkout
            </h1>
            <p className="text-[14px] text-[#605a54]">
              Complete your delivery details to place your order via WhatsApp.
            </p>
          </div>

          {/* Delivery details section */}
          <div className="flex flex-col gap-[18px]">
            <h2 className="font-[family-name:var(--font-instrument-serif)] text-[30px] text-[#1a1a1a]">
              Delivery details
            </h2>

            {/* Form fields */}
            <div className="flex flex-col gap-4">
              {/* Recipient name */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="recipientName"
                  className="text-[12px] font-bold uppercase text-[#1a1a1a]"
                >
                  Recipient name
                </label>
                <input
                  type="text"
                  id="recipientName"
                  name="recipientName"
                  value={formData.recipientName}
                  onChange={handleInputChange}
                  className="h-[52px] rounded border border-[#ebe6de] bg-white px-4 text-[14px] text-[#1a1a1a] outline-none transition-colors focus:border-[#1a1a1a]"
                  placeholder="Enter recipient name"
                />
              </div>

              {/* Phone number */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="phoneNumber"
                  className="text-[12px] font-bold uppercase text-[#1a1a1a]"
                >
                  Phone number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="h-[52px] rounded border border-[#ebe6de] bg-white px-4 text-[14px] text-[#1a1a1a] outline-none transition-colors focus:border-[#1a1a1a]"
                  placeholder="Enter phone number"
                />
              </div>

              {/* Delivery address */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="deliveryAddress"
                  className="text-[12px] font-bold uppercase text-[#1a1a1a]"
                >
                  Delivery address
                </label>
                <input
                  type="text"
                  id="deliveryAddress"
                  name="deliveryAddress"
                  value={formData.deliveryAddress}
                  onChange={handleInputChange}
                  className="h-[52px] rounded border border-[#ebe6de] bg-white px-4 text-[14px] text-[#1a1a1a] outline-none transition-colors focus:border-[#1a1a1a]"
                  placeholder="Enter street address"
                />
              </div>

              {/* City */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="city"
                  className="text-[12px] font-bold uppercase text-[#1a1a1a]"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="h-[52px] rounded border border-[#ebe6de] bg-white px-4 text-[14px] text-[#1a1a1a] outline-none transition-colors focus:border-[#1a1a1a]"
                  placeholder="Enter city"
                />
              </div>

              {/* Postal code */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="postalCode"
                  className="text-[12px] font-bold uppercase text-[#1a1a1a]"
                >
                  Postal code
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className="h-[52px] rounded border border-[#ebe6de] bg-white px-4 text-[14px] text-[#1a1a1a] outline-none transition-colors focus:border-[#1a1a1a]"
                  placeholder="Enter postal code"
                />
              </div>
            </div>

            {/* Delivery note */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="deliveryNote"
                className="text-[12px] font-bold uppercase text-[#1a1a1a]"
              >
                Delivery note · optional
              </label>
              <textarea
                id="deliveryNote"
                name="deliveryNote"
                value={formData.deliveryNote}
                onChange={handleInputChange}
                rows={3}
                className="rounded border border-[#ebe6de] bg-white p-4 text-[14px] text-[#1a1a1a] outline-none transition-colors focus:border-[#1a1a1a]"
                placeholder="Add special delivery instructions..."
              />
            </div>
          </div>
        </div>

        {/* Right column - Order summary */}
        <div className="flex flex-col gap-6">
          {/* Order Summary */}
          <div className="flex flex-col gap-6">
            <h2 className="font-[family-name:var(--font-instrument-serif)] text-[36px] text-[#1a1a1a]">
              Order Summary
            </h2>

            {/* Summary card */}
            <div className="flex flex-col gap-5 rounded-lg bg-[#f4f0eb] p-6">
              {/* Subtotal */}
              <div className="flex flex-col gap-0.5">
                <p className="text-[13px] text-[#605a54]">Subtotal</p>
                <p className="text-[13px] font-bold text-[#1a1a1a]">
                  {subtotal.toFixed(2)} USD
                </p>
              </div>

              {/* Delivery */}
              <div className="flex flex-col gap-0.5">
                <p className="text-[13px] text-[#605a54]">Delivery</p>
                <p className="text-[13px] font-bold text-[#1a1a1a]">
                  {deliveryFee.toFixed(2)} USD
                </p>
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-[#ebe6de]" />

              {/* Total */}
              <div className="flex flex-col gap-0.5">
                <p className="text-[13px] font-bold text-[#1a1a1a]">Total</p>
                <p className="text-[20px] font-bold text-[#1a1a1a]">
                  {orderTotal.toFixed(2)} USD
                </p>
              </div>

              {/* Place order button */}
              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={!isFormValid}
                className="w-full rounded bg-[#25D366] py-4 text-[13px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#20BA5A] disabled:bg-[#605a54] disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-5"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Place order via WhatsApp
              </button>

              {/* WhatsApp note */}
              <p className="text-center text-[10px] uppercase text-[#605a54]">
                Secure order · Complete via WhatsApp
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


