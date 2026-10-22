import { describe, expect, it } from "vitest";
import { getProducts } from "../service/productService";

describe("getProducts", () => {
  it("hämtar produkter via API:t", async () => {
    const products = await getProducts();

    expect(products).toHaveLength(1);
    expect(products[0].name).toBe("Testprodukt");
    expect(products[0].price).toBe(100);
  });
});
