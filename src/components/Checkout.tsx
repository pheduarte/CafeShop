import type { NavigationPages } from "./Navigation";
import type { Beverage } from "../types/beverages";
import { useState } from "react";
import OrderConfirmationCard from "./Checkout/OrderConfirmation";

type CheckoutProps = {
  setCurrentPage: React.Dispatch<React.SetStateAction<NavigationPages>>;
  removeCartItems: React.Dispatch<React.SetStateAction<Beverage[]>>;
  closeCard: () => void;
};

export default function Checkout({
  setCurrentPage,
  removeCartItems,
}: CheckoutProps) {
  // const handlePayment = () => {
  //   removeCartItems([]);
  //   setCurrentPage("home");
  // };

  const [cardOpen, setCardOpen] = useState(false);

  function openCard() {
    setCardOpen(true);
  }

  function closeCard() {
    setCardOpen(false);
    removeCartItems([]);
    setCurrentPage("home");
  }

  return (
    <>
      <h1>CHECKOUT</h1>
      <div className="checkout-form">
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <label>
          Card Number:
          <input type="text" name="cardNumber" />
        </label>
        <label>
          Expiration Date:
          <input type="text" name="expirationDate" />
        </label>
        <label>
          CVV:
          <input type="text" name="cvv" />
        </label>
      </div>
      <div className="checkout-btn-container">
        <button
          className="cancel-button"
          onClick={() => setCurrentPage("home")}
        >
          Cancel
        </button>
        <button className="submit-button" onClick={openCard}>
          Pay
        </button>
      </div>

      {cardOpen && (
        <div className="order-card-overlay" onClick={closeCard}>
          <div
            className={`order-card-modal ${cardOpen ? "open" : ""}`}
            onClick={(event) => event.stopPropagation()}
          >
            <OrderConfirmationCard closeCard={closeCard} />
          </div>
        </div>
      )}
    </>
  );
}
