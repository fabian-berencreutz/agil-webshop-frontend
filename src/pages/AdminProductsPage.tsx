import { useEffect, useState } from "react";
import { getProducts } from "../service/productService";
import type { Product } from "../types/product";

function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setError("Kunde inte hämta produkter"));
  }, []);

  return (
    <div>
      <h1>Admin - Produkter</h1>

      {error && <p>{error}</p>}

      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
        </div>
      ))}
    </div>
  );
}

export default AdminProductsPage;
