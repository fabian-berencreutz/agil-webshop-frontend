const ORDER_API_URL = `${
  import.meta.env.VITE_API_BASE_URL || "http://localhost:9003"
}/order`;

export type CreateOrderItemRequest = {
  productId: number;
  quantity: number;
};

export type CreateOrderRequest = {
  orderItems: CreateOrderItemRequest[];
};

export async function createOrder(order: CreateOrderRequest) {
  const response = await fetch(ORDER_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
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
