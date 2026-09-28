import { useEffect, useState } from 'react';
import type { CartItem, Product } from '../types/product';
import { getProducts } from '../service/productService';
import ProductCard from '../components/ProductCard';
import Cart from '../components/Cart';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  function addToCart(product: Product){
      const cartItem: CartItem = {
        product,
        quantity: 1,
      };

      setCartItems((currentItems) => [...currentItems, cartItem]);

      alert(`${cartItem.product.name} har lagts i kundvagnen`)
  }

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
          <ProductCard key={product.id} product={product} onAdd={addToCart}/>
        ))}
      </ul>

      <button onClick={() => setShowCart(!showCart)}>
        {showCart ? "Dölj kundvagn" : "Visa kundvagn"}
      </button>

      {showCart && <Cart items={cartItems}/>}
    </div>
  );
}
