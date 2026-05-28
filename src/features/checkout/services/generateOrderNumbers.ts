export function generateOrderNumber(): string {
  const orderNumber = `${Date.now()}`;
  const formattedOrderNumber = "ORD-" + orderNumber.slice(5, 10);
  return formattedOrderNumber;
}
