import { db } from "../firestore/firebase-config";
import { collection, addDoc } from "firebase/firestore";

import type { Beverage } from "../types/beverages";

export async function addDocsToFirebase(beverages: Beverage[]) {
  for (const beverage of beverages) {
    await addDoc(collection(db, "beverages"), {
        image: beverage.image,
        name: beverage.name,
        price: beverage.price,
        type: beverage.type,
    });
  }
}
