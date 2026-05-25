import Home from "./Home";
import Checkout from "../features/checkout/components/Checkout";
import { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { Beverage } from "../types/beverages";

export type NavigationPages = "home" | "checkout";

type NavigationProps = {
  navigation: NavigationPages;
};

function Navigation({ navigation }: NavigationProps) {
  const [cartItems, setCartItems, removeCartItems] = useLocalStorage<
    Beverage[]
  >("cart-items", []);

  const [currentPage, setCurrentPage] = useState<NavigationPages>(navigation);

  return (
    <>
      {currentPage === "home" && (
        <Home
          setCurrentPage={setCurrentPage}
          cartItems={cartItems}
          setCartItems={setCartItems}
        />
      )}
      {currentPage === "checkout" && (
        <Checkout
          cartItems={cartItems}
          setCartItems={setCartItems}
          setCurrentPage={setCurrentPage}
          closeCheckout={removeCartItems}
        />
      )}
    </>
  );
}

export default Navigation;
