import "./App.scss";
import { useAuth } from "./hooks/useAuth";
import Navigation from "./components/Navigation";
import Drawer from "./features/drawer/components/Drawer";
import { DrawerProvider } from "./context/DrawerProvider";
import type { User } from "./types/user";
import { signUpUser } from "./features/auth/services/signUpUser";

function App() {
  const { user } = useAuth();

  function handleSignIn() {
    alert(`Welcome back, ${user!.name}!`);
  }

  async function handleSignUp(newUser: User, password: string) {
    try {
      await signUpUser(newUser, password);
      alert("Account created successfully!");
    } catch (error) {
      alert("Something went wrong!");
      console.log(`${error}`);
    }
  }

  return (
    <DrawerProvider>
      <main className="App">
        <Navigation navigation="home" />
      </main>
      <Drawer onSignUp={handleSignUp} onSignIn={handleSignIn} />
    </DrawerProvider>
  );
}

export default App;
