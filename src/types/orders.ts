import type { cartItems } from "./cart";
import { Timestamp } from "firebase/firestore";


export type Order = {
  id?: string;
  orderNumber: string;
  userId: string;
  customerName: string;
  createdAt?: Timestamp;
  items: cartItems[];
  total: number;
  type: "pickup" | "dinein";
  tableNumber?: number;
  status: "waiting" | "ready";
  paid: boolean;
  specialInstructions?: string;
};
