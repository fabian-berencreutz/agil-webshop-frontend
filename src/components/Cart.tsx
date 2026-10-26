import type { CartItem } from "../types/product";

type CartProps = {
  items: CartItem[];
};

const Cart = ({ items }: CartProps) => {
  const totalPrice = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  return (
    <aside>
      <h2>Kundvagn</h2>

      {items.length === 0 ? (
        <p>Kundvagnen är tom.</p>
      ) : (
        <div>
          <ul>
            {items.map((item) => {
              const rowPrice = item.product.price * item.quantity;

              return (
                <li key={item.product.id} className="flex items-center justify-center gap-4">
                  <strong>{item.product.name}</strong>
                  <span>x{item.quantity}</span>
                  <span>Pris: {rowPrice} kr</span>
                </li>
              );
            })}
          </ul>

          <h3>Totalt: {totalPrice} kr</h3>
        </div>
      )}
    </aside>
  );
};

export default Cart;
