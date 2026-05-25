import { db } from "../../../config/firebase-config";
import { collection, addDoc } from "firebase/firestore";
import type { Beverage } from "../../../types/beverages";

export async function addDocsToFirebase(beverages: Beverage) {
    await addDoc(collection(db, "beverages"), {
      image: beverages.image,
      name: beverages.name,
      description: beverages.description,
      price: beverages.price,
      type: beverages.type,
    });
}
