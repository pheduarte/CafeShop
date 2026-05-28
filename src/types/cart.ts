import type { Beverage } from "./beverages";

export type cartItems = {
  beverage: Beverage;
  quantity: number;
  specialInstructions?: string;
}