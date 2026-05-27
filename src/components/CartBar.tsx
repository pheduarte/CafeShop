import { IconShoppingCart } from "@tabler/icons-react";
import type { cartItems } from "./Navigation";

function CartBar({ cartItems }: { cartItems: cartItems[] }) {
  const groupedItems = cartItems.reduce((acc, item) => {
    const existingItem = acc.find((cartItem) => cartItem.beverage.name === item.beverage.name);

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

  return (
    <div className="cart-bar">
      <div className="cart-bar-copy">
        <h2>Cart</h2>
        {cartItems.length > 0 ? (
          <p>
            {/* {cartItems.length} item(s) in your cart. - Total: $
            {cartItems
              .reduce((total, item) => total + item.beverage.price, 0)
              .toFixed(2)} */}
              {totalBeverages}
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
