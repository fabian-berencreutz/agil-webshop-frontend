import { useEffect, useState } from "react";
import { deleteProduct, getProducts } from "../service/productService";
import type { Product } from "../types/product";

function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");

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

  return (
    <div>
      <h1>Admin - Produkter</h1>

      {error && <p>{error}</p>}

      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>

          <button onClick={() => handleDelete(product.id)}>Ta bort</button>
        </div>
      ))}
    </div>
  );
}

export default AdminProductsPage;
