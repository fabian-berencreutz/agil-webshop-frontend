import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
    <div className="flex flex-col items-center justify-center m-4">
    <div className="border rounded-lg w-100 text-center">
      {product.imageUrl && (
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-100 h-48 object-cover rounded-lg"
        />
      )}

      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Pris: {product.price} kr</p>
      <p>Lager: {product.quantity}</p>

      {product.category && <p>Kategori: {product.category}</p>}
    </div>
    <Link to="/products" className="border rounded-lg m-3 p-1 cursor-pointer bg-slate-600 hover:bg-slate-800 text-white">Tillbaka till produkter</Link>
    </div>
  );
}

export default ProductDetailsPage;
