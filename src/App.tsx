import "./App.scss";
import { useState } from "react";
import Navigation from "./components/Navigation";
import Drawer from "./components/Drawer/Drawer";
import { DrawerProvider } from "./context/DrawerProvider";
import type { User } from "./types/user";
import { createUser } from "./api/userApi";

function App() {
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);

  function handleSignIn(user: User) {
    setCurrentUser(user);
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
        user={currentUser}
        onSignUp={handleSignUp}
        onSignIn={handleSignIn}
      />
    </DrawerProvider>
  );
}

export default App;
