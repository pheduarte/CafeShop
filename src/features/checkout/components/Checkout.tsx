import type { NavigationPages } from "../../../types/navigation";
import { useState } from "react";
import OrderConfirmationCard from "./OrderConfirmation";
import "./checkout.scss";
import type { Order } from "../../../types/orders";
import { addNewOrder } from "../services/createOrder";
import { useAuth } from "../../../hooks/useAuth";
import { generateOrderNumber } from "../services/generateOrderNumbers";
import type { cartItems } from "../../../types/cart";
import PaymentForm from "./PaymentForm";
import { IconCreditCard } from "@tabler/icons-react";
import { CloseButton } from "../../../global/ui/closeButton";

type CheckoutProps = {
  cartItems: cartItems[];
  setCartItems: React.Dispatch<React.SetStateAction<cartItems[]>>;
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

  const [openCardPayment, setOpenCardPayment] = useState(false);

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.beverage.price * item.quantity,
    0,
  );

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

  function showCardFields() {
    setOpenCardPayment(true);
  }

  function closeCardFields() {
    setOpenCardPayment(false);
  }

  return (
    <>
      <div className="admin-card-header">
        <h2>Checkout</h2>
        <CloseButton onCloseButton={closeCheckout} />
      </div>

      <button className="card-pay-btn" onClick={showCardFields}>
        <IconCreditCard stroke={1} />
        Credit/Debit Card
      </button>

      {openCardPayment && (
        <PaymentForm
          onCloseCheckout={closeCardFields}
          onHandlePay={handlePay}
        />
      )}

      {confirmationOpen && savedOrder && (
        <div className="order-card-overlay">
          <div className="order-card-modal open">
            <OrderConfirmationCard
              closeCard={closeConfirmation}
              order={savedOrder}
            />
          </div>
        </div>
      )}
    </>
  );
}
