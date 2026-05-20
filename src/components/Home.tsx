import { useState } from "react";
import type { NavigationPages } from "./Navigation";
import { BeverageList } from "./BeverageList";
import CartBar from "./CartBar";
import Cart from "./Cart";
import type { Beverage } from "../types/beverages";

type HomeProps = {
  setCurrentPage: React.Dispatch<React.SetStateAction<NavigationPages>>;
  cartItems: Beverage[];
  setCartItems: React.Dispatch<React.SetStateAction<Beverage[]>>;
};

export default function Home({
  setCurrentPage,
  cartItems,
  setCartItems,
}: HomeProps) {
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

          <Cart
            cartItems={cartItems}
            setCartItems={setCartItems}
            setCurrentPage={setCurrentPage}
          />
        </div>
      ) : (
        <div className="home-overlay">
          <BeverageList setCartItems={setCartItems} />
          <button onClick={toggleCart}>
            <CartBar cartItems={cartItems} />
          </button>
        </div>
      )}
    </div>
  );
}
