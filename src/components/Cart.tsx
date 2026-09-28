import type { CartItem } from "../types/product";

type CartProps = {
    items: CartItem[];
};

const Cart = ({items}: CartProps) => {
    return (
        <aside>
            <h2>Kundvagn</h2>
            <ul>
                {items.map((item, index) => (
                    <li key={`${item.product.id}-${index}`}>
                    {item.product.name} x{item.quantity}
                    </li>
                ))}
            </ul>
        </aside>
    )
}
export default Cart;