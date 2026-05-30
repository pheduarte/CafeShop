import type { Order } from "../../../types/orders";

export function sortOrdersByNewestDate(orders: Order[]) {
  return [...orders].sort((a, b) => {
    const dateA = a.createdAt?.toDate?.().getTime() ?? 0;
    const dateB = b.createdAt?.toDate?.().getTime() ?? 0;

    return dateB - dateA;
  });
}
