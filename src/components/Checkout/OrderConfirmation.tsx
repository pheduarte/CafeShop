import "./Order.scss"

type ConfirmationProps = {
  closeCard: () => void;
};

function OrderConfirmationCard({ closeCard }: ConfirmationProps) {
  return (
    <>
      <div className="store-info-card-header">
        <p>Order Confirmation</p>
        <button className="close-button" onClick={closeCard}>
          ×
        </button>
      </div>
      <section>
        <header className="order-card-header">
          <h2>Order number</h2>
          <p>99</p>
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
