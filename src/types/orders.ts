import type { cartItems } from "../components/Navigation";

export type Order = {
  id?: string;
  orderNumber: number;
  userId: string;
  customerName: string;
  time?: Date;
  items: cartItems[];
  total: number,
  type: "pickup" | "dinein";
  tableNumber?: number;
  status: "waiting" | "ready",
  paid: boolean,
  specialInstructions?: string,
};
