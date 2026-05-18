import { useState } from "react";
import type { NavigationPages } from "./Navigation";
import type { hotBeverage } from "../data/hotBeverage";
import { BeverageList } from "./BeverageList";
import CartBar from "./CartBar";
import Cart from "./Cart";

type HomeProps = {
  setCurrentPage: React.Dispatch<React.SetStateAction<NavigationPages>>;
};

export default function Home({ setCurrentPage }: HomeProps) {
  const [cartItems, setCartItems] = useState<hotBeverage[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      {isOpen ? (
        <div>
          <div className="overlay-header">
            <p>Review Your Order</p>
            <button className="close-button" onClick={toggleCart}>
              x
            </button>
          </div>

          <Cart cartItems={cartItems} setCartItems={setCartItems} setCurrentPage={setCurrentPage}/>
        </div>
      ) : (
        <div className="overlay">
          <BeverageList setCartItems={setCartItems} />
          <button onClick={toggleCart}>
            <CartBar cartItems={cartItems} />
          </button>
        </div>
      )}
    </div>
  );
}
