import type { NavigationPages } from "../../../components/Navigation";
import Checkout from "../../checkout/components/Checkout";
import { useState } from "react";
import "../../../global/ui/cardOverlay.scss";
import type { cartItems } from "../../../components/Navigation";
import "./Cart.scss";

function Cart({
  cartItems,
  setCartItems,
  setCurrentPage,
}: {
  cartItems: cartItems[];
  setCartItems: React.Dispatch<React.SetStateAction<cartItems[]>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<NavigationPages>>;
}) {
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const groupedItems = cartItems.reduce((acc, item) => {
    const existingItem = acc.find(
      (cartItem) => cartItem.beverage.name === item.beverage.name,
    );

    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      acc.push({
        ...item,
      });
    }

    return acc;
  }, [] as cartItems[]);

  const total = groupedItems.reduce(
    (balance, item) => balance + item.beverage.price * item.quantity,
    0,
  );

  function handleRemove(itemToRemove: cartItems) {
    return cartItems.filter(
      (item) => item.beverage.name !== itemToRemove.beverage.name,
    );
  }

  return (
    <div>
      {groupedItems.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is empty</p>
        </div>
      ) : (
        <div className="cart-list">
          <ul>
            {groupedItems.map((item, index) => (
              <li className="cart-item" key={index}>
                <div className="cart-item-container">
                  <p className="card-beverage-title">{item.beverage.name}</p>
                  <p className="card-beverage-price">
                    ${(item.beverage.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <div className="cart-item-container">
                  <p className="card-beverage-quantity">{item.quantity}x</p>
                  <button
                    className="remove-button"
                    onClick={() => setCartItems(handleRemove(item))}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="cart-summary">
        <div className="cart-total">
          <p>Total: ${total.toFixed(2)}</p>
        </div>
        <button
          className="checkout-button"
          disabled={total === 0}
          onClick={() => setCheckoutOpen(true)}
        >
          Checkout
        </button>
      </div>

      {checkoutOpen && (
        <div className="card-overlay">
          <div className="card-modal open">
            <Checkout
              cartItems={cartItems}
              setCartItems={setCartItems}
              setCurrentPage={setCurrentPage}
              closeCheckout={() => setCheckoutOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
