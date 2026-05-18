import type { NavigationPages } from "./Navigation";

type CheckoutProps = {
  setCurrentPage: React.Dispatch<React.SetStateAction<NavigationPages>>;
};

export default function Checkout({ setCurrentPage }: CheckoutProps) {
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
        <button
          className="submit-button"
          onClick={() => setCurrentPage("home")}
        >
          Pay
        </button>
      </div>
    </div>
  );
}
