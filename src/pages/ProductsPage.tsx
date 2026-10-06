import { useEffect, useState } from "react";
import type { CartItem, Product } from "../types/product";
import { getProducts } from "../service/productService";
import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  function addToCart(product: Product) {
    const cartItem: CartItem = {
      product,
      quantity: 1,
    };

    setCartItems((currentItems) => [...currentItems, cartItem]);

    alert(`${cartItem.product.name} har lagts i kundvagnen`);
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
          setError("Ett okänt fel uppstod vid hämtning av produkter.");
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

  const input = searchInput.trim().toLowerCase();

  const filteredProducts = products.filter(
    (product) =>
      String(product.id).includes(input) ||
      product.name.toLowerCase().includes(input) ||
      product.description.toLowerCase().includes(input) ||
      String(product.price).includes(input) ||
      String(product.quantity).includes(input),
  );

  return (
    <div>
      <h2>Produkter</h2>
      <input
        type="text"
        placeholder="Sök"
        value={searchInput}
        onChange={(event) => setSearchInput(event.target.value)}
      />
      {filteredProducts.length === 0 ? (
        <p>Inga produkter med matchar din sökning...</p>
      ) : (
        <ul>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAdd={addToCart} />
          ))}
        </ul>
      )}

      <button onClick={() => setShowCart(!showCart)}>
        {showCart ? "Dölj kundvagn" : "Visa kundvagn"}
      </button>

      {showCart && <Cart items={cartItems} />}
    </div>
  );
}
