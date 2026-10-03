import {
  getStrapiMediaUrl,
  mapStrapiProjectToProduct,
  buildStrapiProjectsQuery,
} from "./strapi-mapper";
import type { StrapiProject } from "../types/strapi.types";

describe("strapi-mapper", () => {
  describe("getStrapiMediaUrl", () => {
    it("returns empty string when url is falsy", () => {
      expect(getStrapiMediaUrl("")).toBe("");
      expect(getStrapiMediaUrl(null)).toBe("");
      expect(getStrapiMediaUrl(undefined)).toBe("");
    });

    it("returns unchanged url when it is already absolute", () => {
      expect(getStrapiMediaUrl("http://cdn.example.com/photo.png")).toBe(
        "http://cdn.example.com/photo.png",
      );
      expect(getStrapiMediaUrl("https://cdn.example.com/photo.png")).toBe(
        "https://cdn.example.com/photo.png",
      );
    });

    it("prepends base URL to relative uploads", () => {
      const url = getStrapiMediaUrl("/uploads/fragrance.png");
      expect(url).toContain("/uploads/fragrance.png");
      expect(url).toMatch(/^http:\/\//);
    });
  });

  describe("mapStrapiProjectToProduct", () => {
    const mockStrapiProject: StrapiProject = {
      id: 23,
      documentId: "metl1inx96q3tw5ivpai0d54",
      name: "Fleur de Lune",
      price: 195,
      description: "A delicate floral fragrance",
      subtitle: "Floral / Jasmine & White Musk",
      scent: "Floral",
      occasion: "Everyday",
      stock: 7,
      available: true,
      image: [
        {
          id: 1,
          documentId: "tbevu10y3olf1xme5qi3s3i9",
          name: "Fleur de Lune.png",
          url: "/uploads/Fleur_de_Lune_a164c75a44.png",
        },
      ],
      category: {
        id: 24,
        documentId: "zajng3yxwq92jzdupztmhdyt",
        name: "Floral",
        subtitle: "Rose, jasmine & neroli",
      },
      size: [
        { id: 1, size: "30ml", price: 100 },
        { id: 2, size: "50ml", price: 120 },
      ],
    };

    it("maps StrapiProject fields correctly to Product", () => {
      const product = mapStrapiProjectToProduct(mockStrapiProject);

      expect(product.id).toBe("metl1inx96q3tw5ivpai0d54");
      expect(product.name).toBe("Fleur de Lune");
      expect(product.price).toBe(195);
      expect(product.category).toBe("Floral");
      expect(product.scentFamily).toBe("Floral");
      expect(product.occasion).toBe("Everyday");
      expect(product.notes).toBe("Floral / Jasmine & White Musk");
      expect(product.images[0]).toContain("/uploads/Fleur_de_Lune_a164c75a44.png");
      expect(product.volumeOptions).toEqual([
        { size: "30ml", price: 100 },
        { size: "50ml", price: 120 },
      ]);
      expect(product.inStockStatus).toBe("Available in Atelier");
    });

    it("correctly handles out of stock or low stock products", () => {
      const outOfStock = mapStrapiProjectToProduct({
        ...mockStrapiProject,
        available: false,
      });
      expect(outOfStock.inStockStatus).toBe("Out of Stock");

      const lowStock = mapStrapiProjectToProduct({
        ...mockStrapiProject,
        stock: 3,
      });
      expect(lowStock.inStockStatus).toBe("Low Stock (3 left)");
    });
  });

  describe("buildStrapiProjectsQuery", () => {
    it("builds query with search filter", () => {
      const query = buildStrapiProjectsQuery({ search: "Lune" });
      expect(query).toContain("filters[$or][0][name][$containsi]=Lune");
      expect(query).toContain("populate=*");
    });

    it("builds query with category name and price range", () => {
      const query = buildStrapiProjectsQuery({
        category: "Floral",
        minPrice: 100,
        maxPrice: 300,
      });
      expect(query).toContain("filters[category][name][$containsi]=Floral");
      expect(query).toContain("filters[price][$gte]=100");
      expect(query).toContain("filters[price][$lte]=300");
    });

    it("builds query with multiple categories", () => {
      const query = buildStrapiProjectsQuery({
        category: "Floral,Fresh",
      });
      expect(query).toContain("filters[category][$or][0][name][$containsi]=Floral");
      expect(query).toContain("filters[category][$or][1][name][$containsi]=Fresh");
    });

    it("maps sort order correctly", () => {
      expect(buildStrapiProjectsQuery({ sort: "price-asc" })).toContain(
        "sort=price:asc",
      );
      expect(buildStrapiProjectsQuery({ sort: "price-desc" })).toContain(
        "sort=price:desc",
      );
      expect(buildStrapiProjectsQuery({ sort: "name-asc" })).toContain(
        "sort=name:asc",
      );
    });

    it("maps pagination parameters", () => {
      const query = buildStrapiProjectsQuery({ page: 2, pageSize: 12 });
      expect(query).toContain("pagination[page]=2");
      expect(query).toContain("pagination[pageSize]=12");
    });
  });
});
