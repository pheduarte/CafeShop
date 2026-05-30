import type { NavigationPages } from "../../../types/navigation";
import { Activity, useState } from "react";
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
import { Timestamp } from "firebase/firestore";
import { useDisclosure } from "../../../hooks/useDisclosure";


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
  const [savedOrder, setSavedOrder] = useState<Order | null>(null);

  const confirmationCard = useDisclosure();
  const card = useDisclosure();

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.beverage.price * item.quantity,
    0,
  );

  async function handlePay() {
    if (!user) {
      alert("Please sign in before placing an order.");
      return;
    }

    if (!user.id) {
      alert("Could not identify the signed-in user. Please sign in again.");
      return;
    }

    const newOrder: Order = {
      orderNumber: generateOrderNumber(),
      userId: user.id,
      customerName: user.name,
      items: cartItems,
      createdAt: Timestamp.now(),
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

      confirmationCard.open();
    } catch (error) {
      console.error(error);
      alert("Could not place order. Please try again.");
    }
  }

  function closeConfirmation() {
    confirmationCard.close();
    setCartItems([]);
    closeCheckout();
    setCurrentPage("home");
  }

  return (
    <>
      <div className="admin-card-header">
        <h2>Checkout</h2>
        <CloseButton onCloseButton={closeCheckout} />
      </div>

      <button
        className="card-pay-btn"
        onClick={card.isOpen ? card.close : card.open}
      >
        <IconCreditCard stroke={1} />
        Credit/Debit Card
      </button>

      <Activity mode={card.isOpen ? "visible" : "hidden"}>
        <PaymentForm onCloseCheckout={card.close} onHandlePay={handlePay} />
      </Activity>

      {confirmationCard.isOpen && savedOrder && (
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
