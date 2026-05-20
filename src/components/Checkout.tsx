import type { NavigationPages } from "./Navigation";
import type { Beverage } from "../types/beverages";

type CheckoutProps = {
  setCurrentPage: React.Dispatch<React.SetStateAction<NavigationPages>>;
  removeCartItems: React.Dispatch<React.SetStateAction<Beverage[]>>;
};

export default function Checkout({
  setCurrentPage,
  removeCartItems,
}: CheckoutProps) {
  const handlePayment = () => {
    removeCartItems([]);
    setCurrentPage("home");
  };

  return (
    <div>
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
        <button className="submit-button" onClick={handlePayment}>
          Pay
        </button>
      </div>
    </div>
  );
}
