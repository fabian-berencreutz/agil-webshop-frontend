import { useEffect, useState } from "react";
import type { CartItem, Product } from "../types/product";
import { getProducts } from "../service/productService";
import { createOrder } from "../service/orderService";
import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart";
import { categories } from "../types/category";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [orderError, setOrderError] = useState<string | null>(null);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);
  const [creatingOrder, setCreatingOrder] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = sessionStorage.getItem("cart");

    if (savedCart) {
      return JSON.parse(savedCart);
    }

    return [];
  });
  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);
  const [showCart, setShowCart] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Alla");
  const categoryOptions = ["Alla", ...categories];

  function addToCart(product: Product) {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.product.id === product.id,
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...currentItems, { product, quantity: 1 }];
    });

    alert(`${product.name} har lagts i kundvagnen`);
  }
  async function handleCheckout() {
    if (cartItems.length === 0) {
      setOrderError("Kundvagnen är tom.");
      return;
    }

    try {
      setCreatingOrder(true);
      setOrderError(null);
      setOrderSuccess(null);

      const order = {
        orderItems: cartItems.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
      };

      await createOrder(order);

      setCartItems([]);
      setOrderSuccess("Ordern skapades!");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setOrderError(err.message);
      } else {
        setOrderError("Ett okänt fel uppstod när ordern skulle skapas.");
      }
    } finally {
      setCreatingOrder(false);
    }
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

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "Alla" || product.category === selectedCategory;

    const matchesSearch =
      String(product.id).includes(input) ||
      product.name.toLowerCase().includes(input) ||
      product.description.toLowerCase().includes(input) ||
      String(product.price).includes(input) ||
      String(product.quantity).includes(input);

    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <h2>Produkter</h2>

      <select
        value={selectedCategory}
        onChange={(event) => setSelectedCategory(event.target.value)}
      >
        {categoryOptions.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Sök"
        value={searchInput}
        onChange={(event) => setSearchInput(event.target.value)}
      />
      {filteredProducts.length === 0 ? (
        <p>Inga produkter matchar din sökning...</p>
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

      {showCart && (
        <>
          <Cart items={cartItems} />

          {cartItems.length > 0 && (
            <button onClick={handleCheckout} disabled={creatingOrder}>
              {creatingOrder ? "Skapar order..." : "Genomför köp"}
            </button>
          )}

          {orderError && <p>{orderError}</p>}
          {orderSuccess && <p>{orderSuccess}</p>}
        </>
      )}
    </div>
  );
}
