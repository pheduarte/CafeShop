import { IconShoppingCart } from "@tabler/icons-react";
import type { cartItems } from "./Navigation";
import "./CartBar.scss"

function CartBar({ cartItems }: { cartItems: cartItems[] }) {
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

  const totalBeverages = groupedItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const total = groupedItems.reduce(
    (balance, item) => balance + item.beverage.price * item.quantity,
    0,
  );

  return (
    <div className="cart-bar">
      <div className="cart-bar-copy">
        <h2>Cart</h2>
        {cartItems.length > 0 ? (
          <p>
            {totalBeverages} item(s) in your cart - Total: $
            {total.toFixed(2)}
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
