import { useEffect, useState } from 'react';
import type { Product } from '../types/product';
import { getProducts } from '../service/productService';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProductsData() {
      try {
        setLoading(true);
        setError(null);
        const data = await getProducts();
        setProducts(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Ett okänt fel uppstod vid hämtning av produkter.');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProductsData();
  }, []);

  if (loading) {
    return <div>Laddar produkter...</div>;
  }

  if (error) {
    return <div>Kunde inte hämta produkter: {error}</div>;
  }

  if (products.length === 0) {
    return <div>Inga produkter hittades.</div>;
  }

  return (
    <div>
      <h2>Produkter</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong> - {product.price} kr (Lager: {product.quantity})
            <p>{product.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
