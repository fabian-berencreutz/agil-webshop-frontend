import { useEffect, useState } from "react";
import {
  deleteProduct,
  getProducts,
  increaseProductStock,
} from "../service/productService";
import type { Product } from "../types/product";
import { categories } from "../types/category";

function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Alla");

  const categoryOptions = ["Alla", ...categories];

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setError("Kunde inte hämta produkter"));
  }, []);

  async function handleDelete(id: number) {
    try {
      await deleteProduct(id);

      setProducts((currentProducts) =>
        currentProducts.filter((product) => product.id !== id),
      );
    } catch {
      setError("Kunde inte ta bort produkten");
    }
  }

  async function handleIncreaseStock(id: number) {
    const input = window.prompt("Hur många produkter vill du lägga till?");

    if (input === null) return;

    const quantity = Number(input);

    if (!Number.isInteger(quantity) || quantity <= 0) {
      setError("Ange ett giltigt heltal större än 0.");
      return;
    }

    try {
      setError("");

      const updatedProducts = await increaseProductStock(id, quantity);

      const updatedProduct = updatedProducts[0];

      if (!updatedProduct) {
        throw new Error("Ingen uppdaterad produkt returnerades.");
      }

      setProducts((currentProducts) =>
        currentProducts.map((product) =>
          product.id === id ? updatedProduct : product,
        ),
      );
    } catch {
      setError("Kunde inte öka lagret.");
    }
  }

  const filteredProducts =
    selectedCategory === "Alla"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl mb-1 mt-4">Admin - Produkter</h1>

      {error && <p className="text-red-600">{error}</p>}

      <select
        value={selectedCategory}
        onChange={(event) => setSelectedCategory(event.target.value)}
        className="border m-3 p-1 rounded-lg"
      >
        {categoryOptions.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      {filteredProducts.length === 0 && <p>Inga produkter i denna kategori.</p>}

      <table>
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Namn</th>
            <th className="border px-4 py-2">Kategori</th>
            <th className="border px-4 py-2">Beskrivning</th>
            <th className="border px-4 py-2">Pris</th>
            <th className="border px-4 py-2">Lager</th>
            <th className="border px-4 py-2">Åtgärder</th>
          </tr>
        </thead>

        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td className="border px-4 py-2">{product.id}</td>

              <td className="border px-4 py-2">{product.name}</td>

              <td className="border px-4 py-2">{product.category}</td>

              <td className="border px-4 py-2">{product.description}</td>

              <td className="border px-4 py-2">{product.price} kr</td>

              <td className="border px-4 py-2">{product.quantity}</td>

              <td className="border px-4 py-2">
                <button
                  onClick={() => handleIncreaseStock(product.id)}
                  className="bg-green-600 text-white px-3 py-1 rounded mr-2"
                >
                  Öka lager
                </button>

                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Ta bort
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminProductsPage;
