import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { productsService } from "@/features/products/services/products.service";
import { ProductDetailsWithCart } from "./product-details-with-cart";

type ProductDetailsProps = {
  params: Promise<{ productId: string }>;
};

export async function generateMetadata({
  params,
}: ProductDetailsProps): Promise<Metadata> {
  const { productId } = await params;
  const product = await productsService.getById(productId);

  if (!product) {
    return {
      title: "Fragrance Not Found | Odoratus",
    };
  }

  return {
    title: `${product.name} | Odoratus`,
    description: product.description || `Discover ${product.name} at Odoratus.`,
  };
}

export default async function ProductDetailsRoute({
  params,
}: ProductDetailsProps) {
  const { productId } = await params;
  const product = await productsService.getById(productId);

  if (!product) {
    notFound();
  }

  return (
    <ProductDetailsWithCart
      productId={productId}
      initialProduct={product}
    />
  );
}
