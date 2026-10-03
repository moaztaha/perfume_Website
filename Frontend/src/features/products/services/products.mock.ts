// import { mockProducts } from "@/features/products/services/products.mock-data";
// import type { ProductsService } from "@/features/products/services/products.service";

// /**
//  * In-memory catalog with full filtering, sorting, and pagination support.
//  */
// export const mockProductsService: ProductsService = {
//   async list(query) {
//     let filtered = [...mockProducts];

//     // Apply search filter
//     if (query.search) {
//       const searchLower = query.search.toLowerCase();
//       filtered = filtered.filter(
//         (product) =>
//           product.name.toLowerCase().includes(searchLower) ||
//           product.description.toLowerCase().includes(searchLower) ||
//           product.notes.toLowerCase().includes(searchLower),
//       );
//     }

//     // Apply category filter (supports multiple)
//     if (query.category) {
//       const categories = query.category.split(",").map((c) => c.trim().toLowerCase());
//       filtered = filtered.filter((product) =>
//         categories.includes(product.category.toLowerCase()),
//       );
//     }

//     // Apply scent family filter (supports multiple)
//     if (query.scentFamily) {
//       const scentFamilies = query.scentFamily.split(",").map((sf) => sf.trim().toLowerCase());
//       filtered = filtered.filter((product) =>
//         scentFamilies.includes(product.scentFamily.toLowerCase()),
//       );
//     }

//     // Apply occasion filter (supports multiple)
//     if (query.occasion) {
//       const occasions = query.occasion.split(",").map((o) => o.trim().toLowerCase());
//       filtered = filtered.filter((product) =>
//         occasions.includes(product.occasion.toLowerCase()),
//       );
//     }

//     // Apply price range filter
//     if (query.minPrice !== undefined) {
//       filtered = filtered.filter((product) => product.price >= query.minPrice!);
//     }
//     if (query.maxPrice !== undefined) {
//       filtered = filtered.filter((product) => product.price <= query.maxPrice!);
//     }

//     // Apply sorting
//     const sorted = [...filtered].sort((a, b) => {
//       switch (query.sort) {
//         case "price-asc":
//           return a.price - b.price;
//         case "price-desc":
//           return b.price - a.price;
//         case "name-asc":
//           return a.name.localeCompare(b.name);
//         case "name-desc":
//           return b.name.localeCompare(a.name);
//         case "newest":
//           // For demo purposes, reverse the order (assuming last added is newest)
//           return mockProducts.indexOf(b) - mockProducts.indexOf(a);
//         case "featured":
//         default:
//           // Default order (as defined in mock data)
//           return 0;
//       }
//     });

//     // Apply pagination
//     const page = query.page ?? 1;
//     const pageSize = query.pageSize ?? 8;
//     const startIndex = (page - 1) * pageSize;
//     const endIndex = startIndex + pageSize;
//     const paginatedItems = sorted.slice(startIndex, endIndex);

//     return {
//       items: paginatedItems,
//       total: sorted.length,
//       page,
//       pageSize,
//     };
//   },

//   async getById(id) {
//     return mockProducts.find((product) => product.id === id) ?? null;
//   },
// };
