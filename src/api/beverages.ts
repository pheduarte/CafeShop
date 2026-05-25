import type { Beverage } from "../types/beverages";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase-config";

export async function getBeverages(): Promise<Beverage[]> {
  const snapshot = await getDocs(collection(db, "beverages"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Beverage[];
}
