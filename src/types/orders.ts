import type { Beverage } from "./beverages";

export type Order = {
  id: string;
  orderNumber: number;
  user: string;
  time: Date;
  items: Beverage[];
  total: number,
  type: "pickup" | "dinein";
  tableNumber?: number;
  status: "waiting" | "ready",
  paid: boolean,
  specialInstructions?: string,
};
