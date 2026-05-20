import { IconShoppingCart } from "@tabler/icons-react";
import type { Beverage } from "../types/beverages";

function CartBar({ cartItems }: { cartItems: Beverage[] }) {
  return (
    <div className="cart-bar">
      <div className="cart-bar-copy">
        <h2>Cart</h2>
        {cartItems.length > 0 ? (
          <p>
            {cartItems.length} item(s) in your cart. - Total: $
            {cartItems
              .reduce((total, item) => total + item.price, 0)
              .toFixed(2)}
          </p>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
      <div className="cart-bar-icon">
        <IconShoppingCart stroke={2} />
      </div>
    </div>
  );
}

export default CartBar;
