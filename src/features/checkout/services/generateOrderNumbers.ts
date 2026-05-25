export function generateOrderNumber(): number {
  return Number(Date.now().toString().slice(-4));
}
