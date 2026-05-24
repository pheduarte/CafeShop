import "./App.scss";
import { useState } from "react";
import Navigation from "./components/Navigation";
import Drawer from "./components/Drawer/Drawer";
import { DrawerProvider } from "./context/DrawerProvider";
import type { User } from "./types/user";
import { createUser } from "./api/userApi";
import { auth } from "./firestore/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";

function App() {
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);

  async function loginWithFirebase(user: User) {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      user.email,
      user.password,
    );
    
    return userCredential.user;
  }

  function handleSignIn(user: User) {
    setCurrentUser(user);
    loginWithFirebase(user);
    alert(`Welcome back, ${user.name}!`);
  }

  async function handleSignUp(newUser: User) {
    try {
      await createUser(newUser);
      alert("Account created successfully!");
    } catch (error) {
      alert("Somenthing went wrong!");
      console.log(`${error}`);
    }
  }

  return (
    <DrawerProvider>
      <main className="App">
        <Navigation navigation="home" />
      </main>
      <Drawer
        userName={currentUser}
        onSignUp={handleSignUp}
        onSignIn={handleSignIn}
      />
    </DrawerProvider>
  );
}

export default App;
