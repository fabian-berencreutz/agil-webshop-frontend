import type { Product } from "../types/product";
import type { Category } from "../types/category";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:9003";
const API_URL = `${API_BASE_URL}/products`;

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(API_URL, {
    credentials: "include",
  });

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new Error(
        "Behörighet saknas för att visa produkter (du måste vara inloggad).",
      );
    }

    throw new Error(`Kunde inte hämta produkter (status ${response.status})`);
  }

  return response.json();
}

export type CreateProductRequest = {
  name: string;
  description: string;
  price: number;
  quantity: number;
  category?: Category;
  imageUrl?: string;
};

export async function createProduct(
  product: CreateProductRequest,
): Promise<Product> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new Error("Behörighet saknas för att lägga till produkt.");
    }

    throw new Error(
      `Kunde inte lägga till produkt (status ${response.status})`,
    );
  }

  return response.json();
}

export async function deleteProduct(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new Error("Behörighet saknas för att ta bort produkt.");
    }

    throw new Error(`Kunde inte ta bort produkt (status ${response.status})`);
  }
}

export async function getProductById(id: number): Promise<Product> {
  const response = await fetch(`${API_URL}/${id}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Kunde inte hämta produkten (status ${response.status})`);
  }

  return response.json();
}
export async function increaseProductStock(
  productId: number,
  quantity: number,
): Promise<Product[]> {
  const response = await fetch(`${API_URL}/stock/increase`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify([
      {
        productId,
        quantity,
      },
      
    ]),
  });

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new Error("Behörighet saknas för att öka lagret.");
    }

    throw new Error(`Kunde inte öka lagret (status ${response.status})`);
  }

  return response.json();
}
