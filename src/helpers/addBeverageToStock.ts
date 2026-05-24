import type { Beverage } from "../types/beverages";
import { addDocsToFirebase } from "../firestore/addBeverageToCatalog";

export function addToStock(beverage: Beverage[]) {
  addDocsToFirebase(beverage);
}
