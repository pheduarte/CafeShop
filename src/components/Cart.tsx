import type { hotBeverage } from "../data/hotBeverage";

function Cart({
  cartItems,
  setCartItems,
}: {
  cartItems: hotBeverage[];
  setCartItems: React.Dispatch<React.SetStateAction<hotBeverage[]>>;
}) {
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
          <p>
            Total: $
            {cartItems
              .reduce((total, item) => total + item.price, 0)
              .toFixed(2)}
          </p>
        </div>
        <button className="checkout-button">Checkout</button>
      </div>
    </div>
  );
}

export default Cart;
