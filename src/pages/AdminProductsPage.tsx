import { useEffect, useState } from "react";
import { deleteProduct, getProducts } from "../service/productService";
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

  const filteredProducts = 
  selectedCategory === "Alla"
  ? products
  : products.filter(
    (product) => product.category === selectedCategory
  );

  return (
    <div className=" flex flex-col items-center justify-center">
      <h1 className="text-2xl mb-1 mt-4">Admin - Produkter</h1>

      {error && <p>{error}</p>}

      {filteredProducts.length === 0 && <p>Inga produkter i denna kategori.</p>}

      <select value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)} className="border m-3 p-1 rounded-lg">
        {categoryOptions.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
        <table>
          <thead>
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Namn</th>
              <th className="border px-4 py-2">Kategori</th>
              <th className="border px-4 py-2">Beskrivning</th>
              <th className="border px-4 py-2">Pris</th>
              <th className="border px-4 py-2">Lager</th>
              <th className="border px-4 py-2"></th>
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
              <td className="border px-4 py-2"><button onClick={() => handleDelete(product.id)}>Ta bort</button></td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  );
}

export default AdminProductsPage;
