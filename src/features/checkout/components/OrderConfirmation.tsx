import "./Order.scss";
import type { Order } from "../../../types/orders";
import { useAuth } from "../../../hooks/useAuth";
import { CloseButton } from "../../../global/ui/closeButton";

type ConfirmationProps = {
  closeCard: () => void;
  order: Order;
};

function OrderConfirmationCard({ closeCard, order }: ConfirmationProps) {
  const { user } = useAuth();

  return (
    <>
      <div className="store-info-card-header">
        <p>Order Confirmation</p>
        <CloseButton onCloseButton={closeCard} />
      </div>
      <section>
        <header className="order-card-header">
          <h2>{user?.name}</h2>
          <h3>Your order number:</h3>
          <p>{order.orderNumber}</p>
        </header>
        <div className="store-info-address">
          <div className="store-info-title">Pick up location</div>
          <p>123 Main St</p>
          <p>Sydney CBD, NSW 2000</p>
        </div>
        <div className="order-message">
          <div className="store-info-title">Thank you for your order</div>
        </div>
      </section>
    </>
  );
}

export default OrderConfirmationCard;
