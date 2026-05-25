import "./App.scss";
import { useState } from "react";
import Navigation from "./components/Navigation";
import Drawer from "./components/Drawer/Drawer";
import { DrawerProvider } from "./context/DrawerProvider";
import type { User } from "./types/user";
import { signUpUserWithFirebase } from "./firestore/signUpUserWithFirebase";

function App() {
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);

  function handleSignIn(user: User) {
    setCurrentUser(user);
    alert(`Welcome back, ${user.name}!`);
  }

  async function handleSignUp(newUser: User, password: string) {
    try {
      await signUpUserWithFirebase(newUser, password);
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
