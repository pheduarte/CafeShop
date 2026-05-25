import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../config/firebase-config";
import type { User } from "../../../types/user";

export async function signUpUser(user: User, password: string) {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    user.email,
    password,
  );

  const firebaseUser = userCredential.user;

  const newUserData: Omit<User, "password"> = {
    id: firebaseUser.uid,
    name: user.name,
    lastName: user.lastName,
    email: user.email,
    mobile: user.mobile,
    role: "customer",
  };

  await setDoc(doc(db, "users", firebaseUser.uid), newUserData);

  return newUserData;
}
