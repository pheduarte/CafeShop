import type { Order } from "../types/orders";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase-config";

export async function getOrders(): Promise<Order[]> {
  const snapshot = await getDocs(collection(db, "orders"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Order[];
}
