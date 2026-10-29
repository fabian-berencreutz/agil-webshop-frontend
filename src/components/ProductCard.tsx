import { useState } from "react";
import type { Product } from "../types/product";

type ProductCardProps = {
  product: Product;
  onAdd: (product: Product, quantity: number) => void;
};

const ProductCard = ({ product, onAdd }: ProductCardProps) => {
  const [quantity, setQuantity] = useState<number | string>(1);
  const isOutOfStock = product.quantity <= 0;

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setQuantity("");
      return;
    }
    const val = Number(value);
    if (isNaN(val)) return;

    if (val < 1) {
      setQuantity(1);
    } else if (product.quantity && val > product.quantity) {
      setQuantity(product.quantity);
    } else {
      setQuantity(val);
    }
  };

  const handleBlur = () => {
    if (quantity === "" || Number(quantity) < 1) {
      setQuantity(1);
    }
  };

  const handleAdd = () => {
    const finalQuantity = typeof quantity === "number" ? quantity : (Number(quantity) || 1);
    onAdd(product, finalQuantity);
  };

  return (
    <article className="border rounded-lg h-full">
      <a href={`/products/${product.id}`}>
        {product.imageUrl && (
          <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded-lg"/>
        )}

        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <strong><p>{product.price} kr</p></strong>
      </a>

      <div className="flex items-center justify-center gap-2 m-4">
        {!isOutOfStock && (
          <>
            <label htmlFor={`qty-${product.id}`} className="text-sm">Antal:</label>
            <input
              id={`qty-${product.id}`}
              type="number"
              min="1"
              max={product.quantity}
              value={quantity}
              onChange={handleQuantityChange}
              onBlur={handleBlur}
              className="border rounded p-1 w-16 text-center"
            />
          </>
        )}
        <button
          onClick={handleAdd}
          disabled={isOutOfStock}
          className={`border rounded-lg p-1 ${
            isOutOfStock
              ? "bg-red-600 text-white cursor-not-allowed"
              : "cursor-pointer bg-blue-900 hover:bg-blue-800 text-white"
          }`}
        >
          {isOutOfStock ? "Slutsåld" : "Lägg i kundvagnen"}
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
