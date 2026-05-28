import Home from "./Home";
import Checkout from "../features/checkout/components/Checkout";
import { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { cartItems } from "../types/cart";
import type { NavigationPages } from "../types/navigation";


type NavigationProps = {
  navigation: NavigationPages;
};


function Navigation({ navigation,  }: NavigationProps) {
  const [cartItems, setCartItems, removeCartItems] = useLocalStorage<
    cartItems[]
  >("cart-items", []);

  const [quantity, setItemQuantity] = useState(1);

  const [currentPage, setCurrentPage] = useState<NavigationPages>(navigation);

  return (
    <>
      {currentPage === "home" && (
        <Home
          setCurrentPage={setCurrentPage}
          cartItems={cartItems}
          setCartItems={setCartItems}
          quantity={quantity}
          setItemQuantity={setItemQuantity}
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
