import "./App.css";
import Navigation from "./components/Navigation";
import Drawer from "./components/Drawer/Drawer";
import { DrawerProvider } from "./context/DrawerProvider";
import { useState } from "react";
import type { User } from "./types/user";

function App() {
  const [user, setUser] = useState<User | undefined>(undefined);

  function handleSignUp(newUser: User) {
    setUser(newUser);
  }

  return (
    <DrawerProvider>
      <main className="App">
        <Navigation navigation="home" />
      </main>
      <Drawer user={user} onSignUp={handleSignUp} />
    </DrawerProvider>
  );
}

export default App;
