import type { Beverage } from "../types/beverages";
import type { NavigationPages } from "./Navigation";

function Cart({
  cartItems,
  setCartItems,
  setCurrentPage,
}: {
  cartItems: Beverage[];
  setCartItems: React.Dispatch<React.SetStateAction<Beverage[]>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<NavigationPages>>;
}) {
  const cartTotal = cartItems.reduce((total, item) => total + item.price, 0);

  function handleRemove(index: number) {
    return cartItems.filter((_, i) => i !== index);
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
          onClick={() => setCurrentPage("checkout")}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
