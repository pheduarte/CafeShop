export type BeverageType = "hot" | "cold" | "special" | "other";

export type Beverage = {
  id?: string | number;
  name: string;
  description: string;
  price: number;
  image?: string;
  type: BeverageType;
};
