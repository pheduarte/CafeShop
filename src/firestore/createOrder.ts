import { db } from "../firestore/firebase-config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import type { Order } from "../types/orders";

export async function addNewOrder(
  order: Order,
) {
  const docRef = await addDoc(collection(db, "orders"), {
    ...order,
    time: serverTimestamp(),
  });

  return docRef.id;
}
