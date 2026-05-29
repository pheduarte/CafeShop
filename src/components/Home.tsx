import { useState } from "react";
import type { NavigationPages } from "../types/navigation";
import { BeverageList } from "./BeverageList";
import CartBar from "./CartBar";
import Cart from "../features/cart/components/Cart";
import Header from "./Header";
import type { cartItems } from "../types/cart";
import "./Home.scss";
import { CloseButton } from "../global/ui/closeButton";

type HomeProps = {
  setCurrentPage: React.Dispatch<React.SetStateAction<NavigationPages>>;
  cartItems: cartItems[];
  setCartItems: React.Dispatch<React.SetStateAction<cartItems[]>>;
  quantity: number;
  setItemQuantity: React.Dispatch<React.SetStateAction<number>>;
};

export default function Home({
  setCurrentPage,
  cartItems,
  setCartItems,
  setItemQuantity,
  quantity,
}: HomeProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <header className="home-header">
        <Header />
      </header>
      <section>
        <div>
          <div className="home-overlay">
            <BeverageList
              setCartItems={setCartItems}
              setItemQuantity={setItemQuantity}
              quantity={quantity}
            />
            <button onClick={toggleCart} className="cartbar">
              <CartBar cartItems={cartItems} />
            </button>
          </div>

          {isOpen && (
            <div className="card-overlay" onClick={toggleCart}>
              <div
                className="card-modal open"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="overlay-header">
                  <h3>Review Your Order</h3>
                  <CloseButton onCloseButton={toggleCart} />
                </div>

                <Cart
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
