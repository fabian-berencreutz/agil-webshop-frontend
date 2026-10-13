import { useState } from "react";
import type { FormEvent } from "react";
import { createProduct } from "../service/productService";
import { categories, type Category } from "../types/category";

function AddProductPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState<Category>(categories[0]);
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
    <div className="flex flex-col items-center justify-center">
      <h1 className="m-3 text-2xl">Lägg till produkt</h1>

      <form onSubmit={handleSubmit} className="flex flex-col m-4 max-w-md">
        <label className="flex flex-col">
          Namn:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-lg m-1 p-1"
          />
        </label>

        <label className="flex flex-col">
          Beskrivning:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded-lg m-1 p-1"
          />
        </label>

        <label className="flex flex-col">
          Pris:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border rounded-lg m-1 p-1"
          />
        </label>

        <label className="flex flex-col">
          Lager:
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="border rounded-lg m-1 p-1"
          />
        </label>

        <label className="flex flex-col">
          Kategori:
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="border rounded-lg m-1 p-1"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col">
          Bild-URL:
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="border rounded-lg m-1 p-1"
          />
        </label>

        <button type="submit" className="border rounded-lg m-3 p-1 cursor-pointer bg-slate-600 hover:bg-slate-800 text-white">Lägg till produkt</button>
      </form>
    </div>
  );
}

export default AddProductPage;
