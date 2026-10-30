export const categoryPaths = {
  list: "/categories",
  filter: (category: string) =>
    `/shop?category=${encodeURIComponent(category.toLowerCase())}`,
} as const;
