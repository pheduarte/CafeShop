import "./App.scss";
import { useState } from "react";
import Navigation from "./components/Navigation";
import Drawer from "./features/drawer/components/Drawer";
import { DrawerProvider } from "./context/DrawerProvider";
import type { User } from "./types/user";
import { signUpUser } from "./features/auth/services/signUpUser";

function App() {
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);

  function handleSignIn(user: User) {
    setCurrentUser(user);
    alert(`Welcome back, ${user.name}!`);
  }

  async function handleSignUp(newUser: User, password: string) {
    try {
      await signUpUser(newUser, password);
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
