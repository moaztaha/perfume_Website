export const productPaths = {
  list: "/shop",
  detail: (productId: string) => "/shop/" + productId,
} as const;
