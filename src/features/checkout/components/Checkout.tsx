import type { NavigationPages } from "../../../components/Navigation";
import { useState } from "react";
import OrderConfirmationCard from "./OrderConfirmation";
import "./checkout.scss";
import type { Beverage } from "../../../types/beverages";
import type { Order } from "../../../types/orders";
import { addNewOrder } from "../services/createOrder";
import { useAuth } from "../../../hooks/useAuth";
import { generateOrderNumber } from "../services/generateOrderNumbers";

type CheckoutProps = {
  cartItems: Beverage[];
  setCartItems: React.Dispatch<React.SetStateAction<Beverage[]>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<NavigationPages>>;
  closeCheckout: () => void;
};

export default function Checkout({
  cartItems,
  setCartItems,
  setCurrentPage,
  closeCheckout,
}: CheckoutProps) {
  const { user } = useAuth();
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [savedOrder, setSavedOrder] = useState<Order | null>(null);

  const cartTotal = cartItems.reduce((total, item) => total + item.price, 0);

  async function handlePay() {
    if (!user) {
      alert("Please sign in before placing an order.");
      return;
    }

    const newOrder: Order = {
      orderNumber: generateOrderNumber(),
      userId: user.id,
      customerName: user.name,
      items: cartItems,
      total: cartTotal,
      type: "pickup",
      tableNumber: 12,
      status: "waiting",
      paid: true,
      specialInstructions: "",
    };

    try {
      const orderId = await addNewOrder(newOrder);

      setSavedOrder({
        ...newOrder,
        id: orderId,
      });

      setConfirmationOpen(true);
    } catch (error) {
      console.error(error);
      alert("Could not place order. Please try again.");
    }
  }

  function closeConfirmation() {
    setConfirmationOpen(false);
    setCartItems([]);
    closeCheckout();
    setCurrentPage("home");
  }

  return (
    <>
      <div className="close-button-container">
        <div>
          <h2>Checkout</h2>
        </div>
        <button className="close-button" onClick={closeCheckout}>
          ×
        </button>
      </div>

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
        <button className="cancel-button" onClick={closeCheckout}>
          Cancel
        </button>

        <button className="submit-button" onClick={handlePay}>
          Pay
        </button>
      </div>

      {confirmationOpen && (
        <div className="order-card-overlay">
          <div className="order-card-modal open">
            <OrderConfirmationCard
              closeCard={closeConfirmation}
              order={savedOrder!}
            />
          </div>
        </div>
      )}
    </>
  );
}
