export type Beverage = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  type: "hot" | "cold" | "special" | "other";
};
