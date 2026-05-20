import "./App.css";
import Navigation from "./components/Navigation";
import Drawer from "./components/Drawer";
import { DrawerProvider } from "./context/DrawerProvider";

function App() {
  return (
    <DrawerProvider>
      <main className="App">
        <Navigation navigation="home" />
      </main>
      <Drawer />
    </DrawerProvider>
  );
}

export default App;
