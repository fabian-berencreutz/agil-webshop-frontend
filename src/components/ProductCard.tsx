import type { Product } from "../types/product";

type ProductCardProps = {
  product: Product;
  onAdd: (product: Product) => void;
};

const ProductCard = ({ product, onAdd }: ProductCardProps) => {
  return (
    <article>
      <a href={`/products/${product.id}`}>
        {product.imageUrl && (
          <img src={product.imageUrl} alt={product.name} width="200" />
        )}

        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <strong>{product.price} kr</strong>
        <p>Lager: {product.quantity}</p>
      </a>

      <button onClick={() => onAdd(product)}>Lägg i kundvagnen</button>
    </article>
  );
};

export default ProductCard;
