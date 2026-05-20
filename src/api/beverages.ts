import type { Beverage } from "../types/beverages";

const API_URL = "http://localhost:3001/beverages";

export async function getBeverages(): Promise<Beverage[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch beverages");
  }

  return response.json();
}
