import { render, screen, fireEvent } from "@testing-library/react";
import { ProductBreadcrumbs } from "@/features/products/components/ProductBreadcrumbs";
import {
  ProductDetails,
  ProductDetailsHeader,
  ProductScentAnatomy,
} from "@/features/products/components/ProductDetails";
import { ProductOptions } from "@/features/products/components/ProductOptions";
import type { Product } from "@/features/products/types/product.types";

const mockTestProduct: Product = {
  id: "santal-parchment",
  name: "Santal Parchment",
  description: "A warm comforting woody fragrance.",
  notes: "Woody / Sandalwood & Cardamom",
  price: 220,
  images: ["/images/products/santal-parchment/main.png"],
  category: "pure-extractions",
  scentFamily: "Woody",
  occasion: "Evening",
  inStockStatus: "Available in Atelier",
  volumeOptions: [
    { size: "30 ml", price: 140 },
    { size: "50 ml", price: 180 },
    { size: "100 ml", price: 220 },
  ],
  notesPyramid: {
    top: "Sicilian Bergamot, Pink Pepper",
    heart: "Egyptian Jasmine Sambac, Papyrus",
    base: "West Indian Sandalwood, Cardamom, Amber",
  },
  options: [
    {
      id: "volume",
      name: "Volume",
      values: ["30 ml", "50 ml", "100 ml"],
    },
  ],
};

describe("ProductBreadcrumbs", () => {
  it("renders breadcrumb trail with product name", () => {
    render(<ProductBreadcrumbs productName="Santal Parchment" />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Shop")).toBeInTheDocument();
    expect(screen.getByText("Fragrances")).toBeInTheDocument();
    expect(screen.getByText("Santal Parchment")).toBeInTheDocument();
  });
});

describe("ProductDetailsHeader", () => {
  it("renders badges, title, dynamic price, and availability status", () => {
    render(
      <ProductDetailsHeader
        product={mockTestProduct}
        currentPrice={180}
      />
    );
    expect(screen.getByText("Scent Family: Woody")).toBeInTheDocument();
    expect(screen.getByText("Occasion: Evening")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: "Santal Parchment" })
    ).toBeInTheDocument();
    expect(screen.getByText("$180")).toBeInTheDocument();
    expect(screen.getByText("Available in Atelier")).toBeInTheDocument();
  });
});

describe("ProductScentAnatomy", () => {
  it("renders narrative and notes pyramid", () => {
    render(<ProductScentAnatomy product={mockTestProduct} />);
    expect(
      screen.getByRole("heading", { level: 2, name: "Scent Anatomy" })
    ).toBeInTheDocument();
    expect(
      screen.getByText("A warm comforting woody fragrance.")
    ).toBeInTheDocument();
    expect(screen.getByText("Top Notes")).toBeInTheDocument();
    expect(
      screen.getByText("Sicilian Bergamot, Pink Pepper")
    ).toBeInTheDocument();
    expect(screen.getByText("Heart Notes")).toBeInTheDocument();
    expect(
      screen.getByText("Egyptian Jasmine Sambac, Papyrus")
    ).toBeInTheDocument();
    expect(screen.getByText("Base Notes")).toBeInTheDocument();
    expect(
      screen.getByText("West Indian Sandalwood, Cardamom, Amber")
    ).toBeInTheDocument();
  });
});

describe("ProductOptions", () => {
  it("renders volume cards and calls onChange when a card is selected", () => {
    const handleChange = jest.fn();
    render(
      <ProductOptions
        product={mockTestProduct}
        selectedOptions={{ volume: "100 ml" }}
        onChange={handleChange}
      />
    );

    expect(screen.getByText("Select Volume")).toBeInTheDocument();
    expect(screen.getByText("30 ml")).toBeInTheDocument();
    expect(screen.getByText("50 ml")).toBeInTheDocument();
    expect(screen.getByText("100 ml")).toBeInTheDocument();

    fireEvent.click(screen.getByText("50 ml"));
    expect(handleChange).toHaveBeenCalledWith("volume", "50 ml");
  });

  it("handles gift wrapping switch toggling", () => {
    const handleToggle = jest.fn();
    render(
      <ProductOptions
        product={mockTestProduct}
        selectedOptions={{ volume: "100 ml" }}
        onChange={jest.fn()}
        giftWrapping={false}
        onToggleGiftWrapping={handleToggle}
      />
    );

    expect(
      screen.getByText("Complimentary Signature Gift Wrapping")
    ).toBeInTheDocument();
    const toggleButton = screen.getByRole("switch");
    fireEvent.click(toggleButton);
    expect(handleToggle).toHaveBeenCalledWith(true);
  });
});
