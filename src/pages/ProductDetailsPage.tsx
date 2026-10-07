import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../service/productService";
import type { Product } from "../types/product";

function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      return;
    }

    getProductById(Number(id))
      .then(setProduct)
      .catch(() => setError("Kunde inte hämta produkten"));
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>Laddar produkt...</p>;
  }

  return (
    <div>
      <h1>{product.name}</h1>

      {product.imageUrl && (
        <img src={product.imageUrl} alt={product.name} width="300" />
      )}

      <p>{product.description}</p>
      <p>Pris: {product.price} kr</p>
      <p>Lager: {product.quantity}</p>

      {product.category && <p>Kategori: {product.category}</p>}
    </div>
  );
}

export default ProductDetailsPage;
