import { getToken } from "./authService";

const ORDER_API_URL =
  import.meta.env.VITE_ORDER_SERVICE_URL || "http://localhost:8082/order";

export type CreateOrderItemRequest = {
  productId: number;
  quantity: number;
};

export type CreateOrderRequest = {
  orderItems: CreateOrderItemRequest[];
};

export async function createOrder(order: CreateOrderRequest) {
  const token = getToken();

  if (!token) {
    throw new Error("Du måste vara inloggad för att skapa en order.");
  }

  const response = await fetch(ORDER_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(order),
  });

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new Error("Du saknar behörighet för att skapa en order.");
    }

    throw new Error(`Kunde inte skapa order (status ${response.status})`);
  }

  return response.json();
}
