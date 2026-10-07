import type { Product } from "../types/product";
import type { Category } from "../types/category";
import { getToken } from "./authService";

const API_URL =
  import.meta.env.VITE_PRODUCT_SERVICE_URL || "http://localhost:8081/products";

export async function getProducts(token?: string): Promise<Product[]> {
  const authToken =
    token ||
    getToken() ||
    localStorage.getItem("token") ||
    localStorage.getItem("accessToken");

  const headers: HeadersInit = {};

  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }

  const response = await fetch(API_URL, {
    headers,
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
  const token = getToken();

  if (!token) {
    throw new Error("Du måste vara inloggad.");
  }

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
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
  const token = getToken();

  if (!token) {
    throw new Error("Du måste vara inloggad.");
  }

  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new Error("Behörighet saknas för att ta bort produkt.");
    }

    throw new Error(`Kunde inte ta bort produkt (status ${response.status})`);
  }
}
export async function getProductById(id: number): Promise<Product> {
  const token = getToken();

  const headers: HeadersInit = {};

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/${id}`, {
    headers,
  });

  if (!response.ok) {
    throw new Error(`Kunde inte hämta produkten (status ${response.status})`);
  }

  return response.json();
}
