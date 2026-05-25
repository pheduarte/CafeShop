import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase-config";
import type { User } from "../types/user";

export async function signInUserWithFirebase(email: string, password: string) {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email.trim(),
    password,
  );

  const uid = userCredential.user.uid;

  const userDoc = await getDoc(doc(db, "users", uid));

  if (!userDoc.exists()) {
    throw new Error("User profile was not found in Firestore.");
  }

  return userDoc.data() as User;
}
