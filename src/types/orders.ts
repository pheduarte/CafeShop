import type { cartItems } from "./cart";

export type Order = {
  id?: string;
  orderNumber: string;
  userId: string;
  customerName: string;
  time?: Date;
  items: cartItems[];
  total: number;
  type: "pickup" | "dinein";
  tableNumber?: number;
  status: "waiting" | "ready";
  paid: boolean;
  specialInstructions?: string;
};
