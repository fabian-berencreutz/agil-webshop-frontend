import type { Product } from "../types/product";

type ProductCardProps = {
  product: Product;
  onAdd: (product: Product) => void;
};

const ProductCard = ({ product, onAdd }: ProductCardProps) => {
  const isOutOfStock = product.quantity <= 0;

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

      <button
        onClick={() => onAdd(product)}
        disabled={isOutOfStock}
        className={`border rounded-lg m-4 p-1 ${
          isOutOfStock
            ? "bg-red-600 text-white cursor-not-allowed"
            : "cursor-pointer bg-blue-900 hover:bg-blue-800 text-white"
        }`}
      >
        {isOutOfStock ? "Slutsåld" : "Lägg i kundvagnen"}
      </button>
    </article>
  );
};

export default ProductCard;
