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
        <>
          <ul>
            {items.map((item) => {
              const rowPrice = item.product.price * item.quantity;

              return (
                <li key={item.product.id}>
                  <strong>{item.product.name}</strong>
                  <p>Pris: {item.product.price} kr</p>
                  <p>Antal: {item.quantity}</p>
                  <p>Radpris: {rowPrice} kr</p>
                </li>
              );
            })}
          </ul>

          <h3>Totalt: {totalPrice} kr</h3>
        </>
      )}
    </aside>
  );
};

export default Cart;
