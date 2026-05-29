import type { User } from "../types/user";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase-config";

export async function getUsers(): Promise<User[]> {
  const snapshot = await getDocs(collection(db, "users"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as User[];
}
