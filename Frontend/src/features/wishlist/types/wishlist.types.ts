export type WishlistItem = {
  id: string;
  productId: string;
  name: string;
  price: number;
  image?: string;
  addedAt: string; // ISO timestamp
};
