import type { Beverage } from "../../../types/beverages";
import { addDocsToFirebase } from "./addBeverageToCatalog";

export function addToStock(beverage: Beverage[]) {
  addDocsToFirebase(beverage);
}
