import type { Order } from "../types/orders"

const API_URL = "http://localhost:3001/orders";

export async function createOrder(order: Order) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(order),
    });

    if(!response.ok) {
        throw new Error("Failed to create order.");
    }

    return response.json();
}

export async function getOrder(id: string) {
  const response = await fetch(
    `${API_URL}?id=${encodeURIComponent(id)}`
  );

  if (!response.ok) {
    console.log("Failed to load orders");
    throw new Error("Failed to load orders");
  }

  const orders: Order[] = await response.json();

  return orders.find((id) => id.status === "waiting") ?? null;
}
