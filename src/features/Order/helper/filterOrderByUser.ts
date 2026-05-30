import type { Order } from "../../../types/orders";

export function filterOrdersByUserId(orders: Order[], userId?: string) {
  return orders.filter((order) => order.userId === userId);
}
