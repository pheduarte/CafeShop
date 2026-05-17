import "./App.css";
import { useState } from "react";
import { BeverageList } from "./components/BeverageList";
import type { hotBeverage } from "./data/hotBeverage";
import CartBar from "./components/CartBar";
import Cart from "./components/Cart";

function App() {
  const [cartItems, setCartItems] = useState<hotBeverage[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <main className="App">
      {isOpen ? (
        <div>
          <div className="overlay-header">
            <p>Review Your Order</p>
            <button className="close-button" onClick={toggleCart}>
              x
            </button>
          </div>

          <Cart cartItems={cartItems} setCartItems={setCartItems} />
        </div>
      ) : (
        <div className="overlay">
          <BeverageList setCartItems={setCartItems} />
          <button onClick={toggleCart}>
            <CartBar cartItems={cartItems} />
          </button>
        </div>
      )}
    </main>
  );
}

export default App;
