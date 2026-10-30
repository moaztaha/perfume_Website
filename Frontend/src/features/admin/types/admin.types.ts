export type DashboardStats = {
  /** Inventory value: sum of (price × stock) for all products */
  totalRevenue: {
    value: number;
    trend: number;
    isPositive: boolean;
  } | null;
  /** Total number of products in the catalogue */
  totalProducts: {
    value: number;
    trend: number;
    isPositive: boolean;
  } | null;
  /** Products with available !== false AND stock > 0 */
  productsInStock: {
    value: number;
    trend: number;
    isPositive: boolean;
  } | null;
  /** Products with stock === 0 or available === false */
  outOfStock: {
    value: number;
    trend: number;
    isPositive: boolean;
  } | null;
};

export type AdminProduct = {
  id: string;
  name: string;
  collection: string;
  price: number | null;
  stock: number | null;
  status: "In Stock" | "Low Stock" | "Out of Stock" | "Unknown";
  image: string;
};

export type ProductFormData = {
  name: string;
  subtitle: string; 
  categoryId?: string | number;
  category?: string | number;
  collection?: string;
  price: number;
  stock: number;
  occasion: string;
  available: boolean;
  description: string; 
  concentration?: string; 
  gender?: string;
  notes?: string;
  images?: string[];
};
