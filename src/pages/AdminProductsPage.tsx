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
    <div>
      <h1>Admin - Produkter</h1>

      {error && <p>{error}</p>}

      {filteredProducts.length === 0 && <p>Inga produkter i denna kategori.</p>}

      <select value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)}>
        {categoryOptions.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      {filteredProducts.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>ID: {product.id}</p>
          <p>Kategori: {product.category}</p>
          <p>{product.description}</p>
          <p>Pris: {product.price} kr</p>
          <p>Lager: {product.quantity}</p>

          <button onClick={() => handleDelete(product.id)}>Ta bort</button>
        </div>
      ))}
    </div>
  );
}

export default AdminProductsPage;
