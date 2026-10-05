import { useState } from "react";
import type { FormEvent } from "react";
import { createProduct } from "../service/productService";

function AddProductPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await createProduct({
        name,
        description,
        price: Number(price),
        quantity: Number(quantity),
        category,
        imageUrl,
      });

      alert("Produkten skapades");
    } catch {
      alert("Kunde inte lägga till produkten");
    }
  }

  return (
    <div>
      <h1>Lägg till produkt</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Namn:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          Beskrivning:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <label>
          Pris:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>

        <label>
          Lager:
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </label>

        <label>
          Kategori:
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </label>

        <label>
          Bild-URL:
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </label>

        <button type="submit">Lägg till produkt</button>
      </form>
    </div>
  );
}

export default AddProductPage;
