export type Beverage = {
  id?: string | number;
  name: string;
  description: string;
  price: number;
  image: string;
  type: "hot" | "cold" | "special" | "other";
};
