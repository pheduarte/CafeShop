import type { Beverage } from "../types/beverages";
import type { NavigationPages } from "./Navigation";
import { createOrder } from "../api/orders";
import type { Order } from "../types/orders";
import Checkout from "./Checkout/Checkout";
import { useState } from "react";

function Cart({
  cartItems,
  setCartItems,
}: {
  cartItems: Beverage[];
  setCartItems: React.Dispatch<React.SetStateAction<Beverage[]>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<NavigationPages>>;
}) {
  const [orderCreated, setOrderCreated] = useState(false);

  const cartTotal = cartItems.reduce((total, item) => total + item.price, 0);

  function handleRemove(index: number) {
    return cartItems.filter((_, i) => i !== index);
  }

  const date: Date = new Date();

  const newOrder: Order = {
    id: "1",
    user: "Phelippe",
    time: date,
    items: cartItems,
    total: cartTotal,
    type: "pickup",
    tableNumber: 12,
    status: "waiting",
    paid: true,
  };

  function handleOrder() {
    createOrder(newOrder);
    setOrderCreated(true);
  }

  return (
    <div>
      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is empty</p>
        </div>
      ) : (
        <div className="cart-list">
          <ul>
            {cartItems.map((item, index) => (
              <li className="cart-item" key={index}>
                {item.name} - ${item.price.toFixed(2)}
                <button
                  className="remove-button"
                  onClick={() => setCartItems(handleRemove(index))}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="cart-summary">
        <div className="cart-total">
          <p>Total: ${cartTotal.toFixed(2)}</p>
        </div>
        <button
          className="checkout-button"
          disabled={cartTotal === 0}
          // onClick={() => setCurrentPage("checkout")}
          onClick={handleOrder}
        >
          Checkout
        </button>
      </div>

      {orderCreated && (
        <div className="checkout-card-overlay">
          <div className="checkout-card-modal open">
            <Checkout />
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
